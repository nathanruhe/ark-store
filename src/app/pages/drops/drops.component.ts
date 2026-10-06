import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef
} from '@angular/core';

import { Drop } from '../../models/drop.model';
import { DropsService } from '../../services/drops.service';

@Component({
  selector: 'app-drops',
  templateUrl: './drops.component.html',
  styleUrls: ['./drops.component.scss']
})
export class DropsComponent implements OnInit, AfterViewInit {

  drops: Drop[] = [];

  currentIndex: Record<string, number> = {};

  constructor(
    private el: ElementRef,
    private dropsService: DropsService
  ) {}


  ngOnInit(): void {

    this.dropsService.getDrops().subscribe({

      next: (drops) => {

        console.log('Drops recibidos:', drops);

        this.drops = drops;

        for (const drop of this.drops) {

          this.currentIndex[drop.ref] = 0;

        }

        setTimeout(() => {

          this.initReveal();

        }, 0);

      },

      error: (error) => {

        console.error(
          'Error obteniendo drops:',
          error
        );

        this.drops = [];

      }

    });

  }


  ngAfterViewInit(): void {

    this.initReveal();

  }


  /* =========================
     IMAGES
  ========================= */

  private getImages(drop: Drop): string[] {

    return drop.gallery?.length
      ? drop.gallery
      : [];

  }


  private ensureIndex(drop: Drop): void {

    if (
      this.currentIndex[drop.ref] === undefined
    ) {

      this.currentIndex[drop.ref] = 0;

    }

  }


  getCurrentImage(drop: Drop): string {

    this.ensureIndex(drop);

    const images = this.getImages(drop);

    if (!images.length) {
      return '';
    }

    return images[
      this.currentIndex[drop.ref]
    ];

  }


  nextImage(
    drop: Drop,
    event?: Event
  ): void {

    event?.stopPropagation();

    this.ensureIndex(drop);

    const images = this.getImages(drop);

    if (images.length <= 1) {
      return;
    }

    const current =
      this.currentIndex[drop.ref];

    this.currentIndex[drop.ref] =
      (current + 1) % images.length;

  }


  prevImage(
    drop: Drop,
    event?: Event
  ): void {

    event?.stopPropagation();

    this.ensureIndex(drop);

    const images = this.getImages(drop);

    if (images.length <= 1) {
      return;
    }

    const current =
      this.currentIndex[drop.ref];

    this.currentIndex[drop.ref] =
      (
        current - 1 + images.length
      ) % images.length;

  }


  /* =========================
     DAYS
  ========================= */

  getRemainingDays(
    date: string
  ): number {

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const endDate =
      new Date(date);

    endDate.setHours(
      0,
      0,
      0,
      0
    );

    const diff =
      endDate.getTime() -
      today.getTime();

    return Math.max(
      Math.ceil(
        diff /
        (1000 * 60 * 60 * 24)
      ),
      0
    );

  }


  /* =========================
     REVEAL
  ========================= */

  private initReveal(): void {

    const observer =
      new IntersectionObserver(

        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                'active'
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },

        {
          threshold: 0.1
        }

      );


    const elements =
      this.el.nativeElement
        .querySelectorAll(
          '.reveal'
        );


    elements.forEach(
      (el: Element) =>
        observer.observe(el)
    );

  }

}