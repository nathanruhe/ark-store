import { Event, EventType } from '../../models/event.model';

export const FINISHED_EVENTS: Event[] = [
  {
    id: 1,
    title: 'Black Friday',
    description: 'Descuentos especiales en toda la tienda.',
    type: EventType.Discount,
    status: 'finished',
    image: 'assets/events/finished/black-friday.jpg',
    startDate: '2025-11-29',
    endDate: '2025-11-30'
  },
    {
    id: 2,
    title: 'Sorteo 10K Instagram',
    description: 'Sorteo especial realizado para celebrar los 10K en Instagram junto a la comunidad.',
    type: EventType.Giveaway,
    status: 'finished',
    image: 'assets/events/finished/sorteo-10k.jpg',
    startDate: '2026-02-08',
    endDate: '2026-02-12'
  }
];