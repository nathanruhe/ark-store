import { Event, EventType } from '../../models/event.model';

export const ACTIVE_EVENTS: Event[] = [
  {
    id: 1,
    title: 'Rebajas de Verano',
    description: '20% de descuento en toda la web durante 24 horas.',
    type: EventType.Discount,
    status: 'active',
    image: 'assets/events/active/rebajas-de-verano.jpg',
    startDate: '2026-06-25',
    endDate: '2026-06-26',
    code: 'VERANO20',
    discount: 20,
    ctaLabel: 'Comprar ahora',
    ctaLink: '/products',
    featured: true
  },
  {
    id: 2,
    title: 'Sorteo Air Jordan',
    description: 'Participa para ganar unas Air Jordan 1.',
    type: EventType.Giveaway,
    status: 'active',
    image: 'assets/events/active/sorteo.jpg',
    startDate: '2026-06-10',
    endDate: '2026-06-30',
    ctaLabel: 'Participar',
    ctaLink: 'https://instagram.com/a.r.k.shop',
    featured: true
  }
];