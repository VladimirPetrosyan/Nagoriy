// Central site config — replaces the original `{{ mustache }}` placeholders
// that the page-builder runtime used to interpolate at render time.
const phone = '+7 (938) 808-80-00';

export const SITE = {
  tgLink: 'https://t.me/+79388088000',
  tgChatLink: 'https://t.me/+79388088000',
  waLink: 'https://wa.me/79388088000',
  maxLink: 'https://max.ru/+79388088000',
  phone,
  phoneHref: phone.replace(/[^\d+]/g, ''),
  priceFrom: 'от 218 000 ₽/м²',
  privacyUrl: '/privacy',
};
