/** Dados de contato centralizados: altere aqui e todo o site é atualizado. */
export const WHATSAPP_NUMBER = '5577998645665';
export const PHONE_DISPLAY = '+55 (77) 99864-5665';
export const INSTAGRAM_HANDLE = 'gvitordesign';
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

export const whatsappLink = (message?: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
