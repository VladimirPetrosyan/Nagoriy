// Minimal callback-form backend — the ONLY place the mailbox SMTP password
// is allowed to exist. It must never end up in the frontend bundle: that
// ships to every visitor's browser, so the password would be trivially
// readable and anyone could use it to send mail as this mailbox.
//
// Uses nodemailer (the one dependency this server has) to relay the form
// submission as an email via SMTP.
//
// Required environment variables (see .env.example):
//   SMTP_HOST  — SMTP server, e.g. smtp.yandex.ru
//   SMTP_PORT  — defaults to 465 (implicit TLS)
//   SMTP_USER  — mailbox login used to authenticate (e.g. the full address)
//   SMTP_PASS  — mailbox password / app password
//   EMAIL_TO   — recipient address, e.g. realty.experta@yandex.ru
//   EMAIL_FROM — optional, defaults to SMTP_USER
//   PORT       — defaults to 3001; nginx proxies /api/ to this port

import http from 'node:http';
import nodemailer from 'nodemailer';

const PORT = process.env.PORT || 3001;
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.yandex.ru';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const EMAIL_TO = process.env.EMAIL_TO || 'realty.experta@yandex.ru';
const EMAIL_FROM = process.env.EMAIL_FROM || SMTP_USER;
const MAX_BODY_BYTES = 10_000;

const transporter = SMTP_USER && SMTP_PASS
  ? nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for 465 (implicit TLS), false for e.g. 587 (STARTTLS)
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
  : null;

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

  if (!transporter) {
    console.error('[callback] Missing SMTP_USER / SMTP_PASS env vars');
    return sendJson(res, 500, { ok: false, error: 'not_configured' });
  }

  const html = [
    '<p><b>📞 Новая заявка на обратный звонок</b></p>',
    `<p><b>Имя:</b> ${escapeHtml(name)}<br>`,
    `<b>Телефон:</b> ${escapeHtml(phone)}</p>`,
    '<p>Источник: сайт «Нагория»</p>',
  ].join('\n');

  try {
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `Заявка на звонок — ${name}`,
      text: `Новая заявка на обратный звонок\n\nИмя: ${name}\nТелефон: ${phone}\n\nИсточник: сайт «Нагория»`,
      html,
    });

    return sendJson(res, 200, { ok: true });
  } catch (err) {
    console.error('[callback] Failed to send email:', err);
    return sendJson(res, 502, { ok: false, error: 'email_failed' });
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
