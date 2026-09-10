export const fmt = (n: number): string =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5491100000000';

export function waLinkForPerfume(name: string): string {
  const msg = `Hola, estaba interesado en el perfume ${name} publicado en Luan Essence. ¿Podrías darme más información sobre disponibilidad y envío?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function waLinkForUpcoming(name: string): string {
  const msg = `Hola, quiero que me avisen cuando llegue el perfume ${name} a Luan Essence.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
