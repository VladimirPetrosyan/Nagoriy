// Minimal callback-form backend — the ONLY place the Telegram bot token is
// allowed to exist. It must never end up in the frontend bundle: that ships
// to every visitor's browser, so the token would be trivially readable and
// anyone could use it to send messages (spam) as this bot.
//
// No framework/dependencies on purpose (just Node's built-in http + global
// fetch, available since Node 18) — keeps the Docker image tiny and the
// attack surface small for something this simple.
//
// Required environment variables (see .env.example):
//   TELEGRAM_BOT_TOKEN  — from @BotFather
//   TELEGRAM_CHAT_ID    — numeric chat id of the recipient (NOT a t.me/... link
//                         or @username — see .env.example for how to find it)
//   PORT                — defaults to 3001; nginx proxies /api/ to this port
//
// Optional (only needed if this server's own outbound network can't reach
// api.telegram.org directly — e.g. a Russian VPS, where ISP/DPI filtering
// routinely blocks it even though it's reachable from elsewhere):
//   TELEGRAM_RELAY_URL    — base URL of the Cloudflare Worker relay (see
//                           cloudflare-relay/worker.js), e.g.
//                           https://your-worker.workers.dev
//   TELEGRAM_RELAY_SECRET — shared secret configured on that Worker

import http from 'node:http';

const PORT = process.env.PORT || 3001;
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const RELAY_URL = process.env.TELEGRAM_RELAY_URL; // e.g. https://xxx.workers.dev
const RELAY_SECRET = process.env.TELEGRAM_RELAY_SECRET;
const MAX_BODY_BYTES = 10_000;

function escapeHtml(str) {
  return str.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    let tooLarge = false;
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > MAX_BODY_BYTES) {
        tooLarge = true;
        req.destroy();
      }
    });
    req.on('end', () => {
      if (tooLarge) return reject(new Error('payload_too_large'));
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('invalid_json'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

async function handleCallback(req, res) {
  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return sendJson(res, 400, { ok: false, error: 'bad_request' });
  }

  const name = typeof body?.name === 'string' ? body.name.trim().slice(0, 120) : '';
  const phone = typeof body?.phone === 'string' ? body.phone.trim().slice(0, 40) : '';
  const phoneDigits = phone.replace(/\D/g, '');

  if (name.length < 2 || phoneDigits.length < 10) {
    return sendJson(res, 400, { ok: false, error: 'invalid_input' });
  }

  if (!TOKEN || !CHAT_ID) {
    console.error('[callback] Missing TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID env vars');
    return sendJson(res, 500, { ok: false, error: 'not_configured' });
  }

  const text = [
    '📞 <b>Новая заявка на обратный звонок</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    '',
    'Источник: сайт «Нагория»',
  ].join('\n');

  // Go through the Cloudflare relay when configured (see .env.example),
  // otherwise call Telegram directly — same request either way, just a
  // different base URL and one extra header.
  const base = RELAY_URL ? RELAY_URL.replace(/\/$/, '') : 'https://api.telegram.org';
  const headers = { 'Content-Type': 'application/json' };
  if (RELAY_URL) headers['X-Relay-Secret'] = RELAY_SECRET || '';

  try {
    const tgRes = await fetch(`${base}/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
    });

    if (!tgRes.ok) {
      console.error('[callback] Telegram API error:', tgRes.status, await tgRes.text());
      return sendJson(res, 502, { ok: false, error: 'telegram_failed' });
    }

    return sendJson(res, 200, { ok: true });
  } catch (err) {
    console.error('[callback] Failed to reach Telegram API:', err);
    return sendJson(res, 502, { ok: false, error: 'telegram_unreachable' });
  }
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/callback') {
    handleCallback(req, res);
    return;
  }
  if (req.method === 'GET' && req.url === '/healthz') {
    return sendJson(res, 200, { ok: true });
  }
  sendJson(res, 404, { ok: false, error: 'not_found' });
});

server.listen(PORT, () => {
  console.log(`[callback] listening on :${PORT}`);
});
