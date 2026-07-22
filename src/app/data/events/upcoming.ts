import { Event, EventType } from '../../models/event.model';

export const UPCOMING_EVENTS: Event[] = [
  {
    id: 1,
    title: 'Fin de semana Mystery Box',
    description: 'Cajas sorpresa limitadas disponibles próximamente.',
    type: EventType.Drop,
    status: 'upcoming',
    image: 'assets/events/upcoming/mystery-box.jpg',
    startDate: '2026-07-15',
  },
    {
    id: 2,
    title: 'Restock Summer Essentials',
    description: 'Reposición de prendas y accesorios esenciales más solicitados de la temporada.',
    type: EventType.Restock,
    status: 'upcoming',
    image: 'assets/events/upcoming/restock.jpg',
    startDate: '2026-08-02',
  }
];