// Cloudflare Worker — a thin relay that forwards Telegram Bot API calls.
// Exists only because api.telegram.org is frequently unreachable from
// Russian server IPs (ISP/DPI-level filtering), even though it works fine
// from Cloudflare's edge network. Deploy this once in the Cloudflare
// dashboard (Workers & Pages → Create Worker → paste this file's content),
// set the RELAY_SECRET variable there (Settings → Variables, add as a
// "Secret"), and point server/.env's TELEGRAM_RELAY_URL /
// TELEGRAM_RELAY_SECRET at it — see server/.env.example.
//
// Deliberately generic: forwards whatever path it's called with
// (e.g. /bot<TOKEN>/sendMessage) straight through to api.telegram.org, so
// the bot token itself never has to be hardcoded here. The shared secret
// is just to stop randoms who find this worker's URL from using it as an
// open relay to spam through arbitrary bot tokens.

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const secret = request.headers.get('X-Relay-Secret');
    if (!env.RELAY_SECRET || secret !== env.RELAY_SECRET) {
      return new Response('Forbidden', { status: 403 });
    }

    const url = new URL(request.url);
    const telegramUrl = `https://api.telegram.org${url.pathname}${url.search}`;
    const body = await request.text();

    try {
      const tgRes = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const text = await tgRes.text();
      return new Response(text, {
        status: tgRes.status,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ ok: false, error: 'relay_unreachable', detail: String(err) }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};
