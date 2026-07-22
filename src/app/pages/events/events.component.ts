import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef
} from '@angular/core';

import { Router } from '@angular/router';

import {
  ACTIVE_EVENTS,
  UPCOMING_EVENTS,
  FINISHED_EVENTS,
  ANNOUNCEMENTS,
  WINNERS
} from '../../data/events';

import { Event } from '../../models/event.model';
import { Announcement } from '../../models/announcement.model';
import { Winner } from '../../models/winner.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, AfterViewInit, OnDestroy {

  featuredEvents: Event[] = [];
  featuredIndex = 0;
  featuredTransitioning = false;

  activeEvents: Event[] = [];
  upcomingEvents: Event[] = [];
  finishedEvents: Event[] = [];

  announcements: Announcement[] = [];
  winners: Winner[] = [];

  private featuredInterval: ReturnType<typeof setInterval> | null = null;
  private transitionTimeout: ReturnType<typeof setTimeout> | null = null;
  private touchStartX = 0;

  private readonly featuredDuration = 5000;
  private readonly transitionDuration = 450;

  constructor(
    private el: ElementRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeEvents = ACTIVE_EVENTS;
    this.upcomingEvents = UPCOMING_EVENTS;
    this.finishedEvents = FINISHED_EVENTS;

    this.announcements = ANNOUNCEMENTS;
    this.winners = WINNERS;

    const allEvents = [
      ...ACTIVE_EVENTS,
      ...UPCOMING_EVENTS,
      ...FINISHED_EVENTS
    ];

    this.featuredEvents = allEvents.filter(event => event.featured);

    if (this.featuredEvents.length > 1) {
      this.startFeaturedSlider();
    }
  }

  ngAfterViewInit(): void {
    this.initObserver();
  }

  ngOnDestroy(): void {
    this.stopFeaturedSlider();

    if (this.transitionTimeout) {
      clearTimeout(this.transitionTimeout);
      this.transitionTimeout = null;
    }
  }

  get featured(): Event | null {
    return this.featuredEvents[this.featuredIndex] ?? null;
  }

  /* =========================
     CTA LINKS
  ========================= */

  goToLink(link?: string): void {

    if (!link) return;

    const isExternal =
      link.startsWith('http://') ||
      link.startsWith('https://');

    if (isExternal) {
      window.open(link, '_blank');
      return;
    }

    this.router.navigateByUrl(link);
  }

  /* =========================
     FEATURED SLIDER
  ========================= */

  nextFeatured(manual = false): void {
    if (!this.featuredEvents.length) return;

    this.setFeaturedIndex(
      (this.featuredIndex + 1) % this.featuredEvents.length
    );

    if (manual) {
      this.restartFeaturedSlider();
    }
  }

  prevFeatured(): void {
    if (!this.featuredEvents.length) return;

    const nextIndex =
      this.featuredIndex === 0
        ? this.featuredEvents.length - 1
        : this.featuredIndex - 1;

    this.setFeaturedIndex(nextIndex);
    this.restartFeaturedSlider();
  }

  setFeaturedIndex(index: number): void {
    if (index === this.featuredIndex || !this.featuredEvents.length) return;

    this.featuredTransitioning = true;
    this.featuredIndex = index;

    if (this.transitionTimeout) {
      clearTimeout(this.transitionTimeout);
    }

    this.transitionTimeout = setTimeout(() => {
      this.featuredTransitioning = false;
    }, this.transitionDuration);
  }

  startFeaturedSlider(): void {
    this.stopFeaturedSlider();

    if (this.featuredEvents.length <= 1) return;

    this.featuredInterval = setInterval(() => {
      this.nextFeatured();
    }, this.featuredDuration);
  }

  stopFeaturedSlider(): void {
    if (this.featuredInterval) {
      clearInterval(this.featuredInterval);
      this.featuredInterval = null;
    }
  }

  pauseFeaturedSlider(): void {
    this.stopFeaturedSlider();
  }

  resumeFeaturedSlider(): void {
    this.startFeaturedSlider();
  }

  restartFeaturedSlider(): void {
    this.stopFeaturedSlider();
    this.startFeaturedSlider();
  }

  onHeroTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.pauseFeaturedSlider();
  }

  onHeroTouchEnd(event: TouchEvent): void {
    const diff =
      event.changedTouches[0].clientX - this.touchStartX;

    if (diff < -40) {
      this.nextFeatured(true);
    } else if (diff > 40) {
      this.prevFeatured();
    } else {
      this.resumeFeaturedSlider();
    }
  }

  /* =========================
     DATE FORMAT
  ========================= */

  formatDate(dateString?: string): string {
    if (!dateString) return '';

    const date = this.parseDate(dateString);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    const hasTime = /T|\d{2}:\d{2}/.test(dateString);

    const options: Intl.DateTimeFormatOptions = hasTime
      ? {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }
      : {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        };

    return new Intl.DateTimeFormat('es-ES', options).format(date);
  }

  private parseDate(dateString: string): Date {

    if (/T|\d{2}:\d{2}/.test(dateString)) {
      return new Date(dateString);
    }

    const [year, month, day] =
      dateString.split('-').map(Number);

    if (!year || !month || !day) {
      return new Date(dateString);
    }

    return new Date(year, month - 1, day);
  }

  /* =========================
     REVEAL
  ========================= */

  private initObserver(): void {

    const observer = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add('active');
          observer.unobserve(entry.target);

        }

      });

    }, {
      threshold: 0.12
    });

    const elements =
      this.el.nativeElement.querySelectorAll('.reveal');

    elements.forEach((el: Element) =>
      observer.observe(el)
    );
  }
}