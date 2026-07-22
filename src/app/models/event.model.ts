export enum EventType {
  Giveaway = 'Sorteos',
  Discount = 'Descuentos',
  Drop = 'Lanzamientos',
  Restock = 'Reposición'
}

export type EventStatus =
  | 'active'
  | 'upcoming'
  | 'finished';

export interface Event {
  id: number;
  title: string;
  description: string;
  type: EventType;
  status: EventStatus;
  image: string;
  startDate: string;
  endDate?: string;
  code?: string;
  discount?: number;
  ctaLabel?: string;
  ctaLink?: string;
  featured?: boolean;
}