import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef
} from '@angular/core';

import { Drop } from '../../models/drop.model';
import { DROPS } from '../../data/products/drops/drops';

@Component({
  selector: 'app-drops',
  templateUrl: './drops.component.html',
  styleUrls: ['./drops.component.scss']
})
export class DropsComponent implements OnInit, AfterViewInit {

  drops: Drop[] = [];

  currentIndex: Record<number, number> = {};

  constructor(private el: ElementRef) {}

  ngOnInit(): void {

    this.drops = DROPS
      .filter(drop => this.isDropVisible(drop))
      .sort((a, b) => {
        const endA = new Date(a.endDate).getTime();
        const endB = new Date(b.endDate).getTime();

        return endA - endB;
      });

    for (const drop of this.drops) {
      this.currentIndex[drop.id] = 0;
    }
  }

  ngAfterViewInit(): void {
    this.initReveal();
  }

  /* =========================
     DROP VISIBILITY
  ========================= */

  private isDropVisible(drop: Drop): boolean {

    if (!drop.active) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endDate = new Date(drop.endDate);
    endDate.setHours(0, 0, 0, 0);

    return endDate >= today;
  }

  /* =========================
     IMAGES
  ========================= */

  private getImages(drop: Drop): string[] {
    return drop.gallery?.length
      ? [drop.image, ...drop.gallery]
      : [drop.image];
  }

  private ensureIndex(drop: Drop): void {
    if (this.currentIndex[drop.id] === undefined) {
      this.currentIndex[drop.id] = 0;
    }
  }

  getCurrentImage(drop: Drop): string {
    this.ensureIndex(drop);

    const images = this.getImages(drop);

    return images[this.currentIndex[drop.id]];
  }

  nextImage(drop: Drop, event?: Event): void {
    event?.stopPropagation();

    this.ensureIndex(drop);

    const images = this.getImages(drop);

    const current = this.currentIndex[drop.id];

    this.currentIndex[drop.id] =
      (current + 1) % images.length;
  }

  prevImage(drop: Drop, event?: Event): void {
    event?.stopPropagation();

    this.ensureIndex(drop);

    const images = this.getImages(drop);

    const current = this.currentIndex[drop.id];

    this.currentIndex[drop.id] =
      (current - 1 + images.length) % images.length;
  }

  /* =========================
     DAYS
  ========================= */

  getRemainingDays(date: string): number {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(0, 0, 0, 0);

    const diff =
      endDate.getTime() - today.getTime();

    return Math.max(
      Math.ceil(diff / (1000 * 60 * 60 * 24)),
      0
    );
  }

  /* =========================
     REVEAL
  ========================= */

  private initReveal(): void {

    const observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add('active');

            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.1
      }
    );

    const elements =
      this.el.nativeElement.querySelectorAll('.reveal');

    elements.forEach((el: Element) =>
      observer.observe(el)
    );
  }
}