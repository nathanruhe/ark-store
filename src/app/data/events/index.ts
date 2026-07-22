export * from './active';
export * from './upcoming';
export * from './finished';
export * from './announcements';
export * from './winners';

import { ACTIVE_EVENTS } from './active';
import { UPCOMING_EVENTS } from './upcoming';
import { FINISHED_EVENTS } from './finished';
import { Event, EventStatus } from '../../models/event.model';

export const ALL_EVENTS: Event[] = [
  ...ACTIVE_EVENTS,
  ...UPCOMING_EVENTS,
  ...FINISHED_EVENTS
];

/* =========================
   HELPERS
========================= */

const filterByStatus = (status: EventStatus): Event[] =>
  ALL_EVENTS.filter(event => event.status === status);

/**
 * Featured events ordenados de forma estable
 * - primero los featured
 * - luego por fecha (más recientes primero)
 */
const getFeatured = (): Event[] =>
  ALL_EVENTS
    .filter(e => e.featured)
    .sort((a, b) =>
      new Date(b.startDate).getTime() -
      new Date(a.startDate).getTime()
    );

export const EventsAPI = {
  all: ALL_EVENTS,

  active: () => ACTIVE_EVENTS,
  upcoming: () => UPCOMING_EVENTS,
  finished: () => FINISHED_EVENTS,

  byStatus: filterByStatus,
  byId: (id: number) =>
    ALL_EVENTS.find(event => event.id === id) ?? null,

  featured: getFeatured
};