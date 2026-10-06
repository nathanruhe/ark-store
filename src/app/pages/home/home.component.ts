import {
  Component,
  AfterViewInit,
  OnInit,
  ElementRef,
  OnDestroy
} from '@angular/core';

import { Drop } from '../../models/drop.model';
import { DropsService } from '../../services/drops.service';

interface BrandFact {
  value: string;
  label: string;
}

interface CommunityFact {
  value: string;
  label: string;
}

interface ProcessStep {
  number: string;
  title: string;
  text: string;
}

interface InstagramPost {
  image: string;
  name: string;
  brand: string;
  ref: string;
  endDate: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent
  implements OnInit, AfterViewInit, OnDestroy {

  featuredDrops: Drop[] = [];

  brandLogos: string[] = [
    'Adidas',
    'Gucci',
    'Hermès',
    'New Balance',
    'Jordan',
    'Nike',
    'Napapijri',
    'Louis Vuitton',
    'Prada',
    'Chanel',
    'Timberland',
    'Calvin Klein',
    'Diesel',
    'G-star',
    'Tommy hilfiger',
    'Superdry',
    'Lacoste',
    'The North Face',
  ];

  processSteps: ProcessStep[] = [
    {
      number: '01',
      title: 'Explora',
      text: 'Descubre drops seleccionados y piezas activas de la colección.'
    },
    {
      number: '02',
      title: 'Reserva',
      text: 'Confirma tu interés por Instagram o WhatsApp con la REF del producto.'
    },
    {
      number: '03',
      title: 'Recíbelo',
      text: 'Gestionamos tu pedido y el envío con un seguimiento directo y claro.'
    }
  ];

  communityFacts: CommunityFact[] = [
    {
      value: 'DM',
      label: 'Contacto directo'
    },
    {
      value: '24/7',
      label: 'Instagram first'
    },
    {
      value: 'Brands',
      label: 'Selección editorial'
    }
  ];

  brandFacts: BrandFact[] = [
    {
      value: '+120',
      label: 'Piezas seleccionadas'
    },
    {
      value: '3',
      label: 'Drops destacados'
    },
    {
      value: '100%',
      label: 'Gestión directa'
    }
  ];

  instagramPosts: InstagramPost[] = [];

  private revealObserver?: IntersectionObserver;

  private cleanupFns: Array<() => void> = [];

  private destroyed = false;

  constructor(
    private el: ElementRef,
    private dropsService: DropsService
  ) {}

  ngOnInit(): void {
    this.loadLandingContent();
  }

  ngAfterViewInit(): void {
    this.initReveal();
    this.initBackgroundParallax();

    if (window.innerWidth > 768) {
      this.initDraggableLetters();
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;

    this.revealObserver?.disconnect();

    this.cleanupFns.forEach(fn => fn());

    this.cleanupFns = [];
  }

  /* =========================
     LANDING CONTENT
  ========================= */

  private isDropActive(drop: Drop): boolean {

    if (!drop.active) {
      return false;
    }

    const end = new Date(drop.endDate);

    // El drop permanece activo hasta las 23:59:59
    // del día indicado.
    end.setHours(23, 59, 59, 999);

    return end.getTime() > Date.now();
  }

  private loadLandingContent(): void {

    this.dropsService.getDrops().subscribe({

      next: (drops) => {

        const activeSorted = [...drops]
          .filter(drop => this.isDropActive(drop))
          .sort(
            (a, b) =>
              new Date(a.endDate).getTime() -
              new Date(b.endDate).getTime()
          );

        // Mostramos únicamente los 3 drops
        // que caducan antes.
        this.featuredDrops =
          activeSorted.slice(0, 3);

        // Preparado por si posteriormente
        // volvemos a utilizar Instagram.
        this.instagramPosts =
          activeSorted
            .slice(0, 6)
            .map(drop => ({
              image: drop.gallery?.[0] ?? '',
              name: drop.name,
              brand: drop.brand,
              ref: drop.ref,
              endDate: drop.endDate
            }));

        console.log(
          'Drops destacados Home:',
          this.featuredDrops
        );
      },

      error: (error) => {

        console.error(
          'Error obteniendo drops para Home:',
          error
        );

        this.featuredDrops = [];
        this.instagramPosts = [];
      }

    });
  }

  /* =========================
     REVEAL
  ========================= */

  private initReveal(): void {

    this.revealObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                'active'
              );

              this.revealObserver?.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.15
        }
      );

    const elements =
      this.el.nativeElement
        .querySelectorAll('.reveal');

    elements.forEach((el: Element) => {

      this.revealObserver?.observe(el);

    });
  }

  /* =========================
     BACKGROUND PARALLAX
  ========================= */

  private initBackgroundParallax(): void {

    const hero =
      this.el.nativeElement
        .querySelector('.hero');

    const bg =
      this.el.nativeElement
        .querySelector('.hero-bg img');

    const lights =
      this.el.nativeElement
        .querySelectorAll('.light');

    if (!hero || !bg) {
      return;
    }

    const onMouseMove =
      (e: MouseEvent) => {

        const x =
          (window.innerWidth / 2 -
            e.clientX) / 40;

        const y =
          (window.innerHeight / 2 -
            e.clientY) / 40;

        bg.style.transform = `
          scale(1.12)
          translate(
            ${x * 0.5}px,
            ${y * 0.5}px
          )
        `;

        lights.forEach(
          (
            light: HTMLElement,
            index: number
          ) => {

            const depth =
              (index + 1) * 0.25;

            light.style.transform = `
              translate(
                ${x * depth}px,
                ${y * depth}px
              )
            `;

          }
        );
      };

    const onMouseLeave = () => {

      bg.style.transform =
        'scale(1.12)';

      lights.forEach(
        (light: HTMLElement) => {

          light.style.transform =
            'translate(0px,0px)';

        }
      );
    };

    hero.addEventListener(
      'mousemove',
      onMouseMove
    );

    hero.addEventListener(
      'mouseleave',
      onMouseLeave
    );

    this.cleanupFns.push(() => {

      hero.removeEventListener(
        'mousemove',
        onMouseMove
      );

      hero.removeEventListener(
        'mouseleave',
        onMouseLeave
      );

    });
  }

  /* =========================
     DRAG SYSTEM
  ========================= */

  private initDraggableLetters(): void {

    const letters =
      this.el.nativeElement
        .querySelectorAll('.draggable');

    letters.forEach(
      (letter: HTMLElement) => {

        let isDragging = false;

        let startX = 0;
        let startY = 0;

        let currentX = 0;
        let currentY = 0;

        let targetX = 0;
        let targetY = 0;

        let frameId = 0;

        const animate = () => {

          if (this.destroyed) {
            return;
          }

          currentX +=
            (targetX - currentX) *
            0.14;

          currentY +=
            (targetY - currentY) *
            0.14;

          const rotate =
            currentX * 0.04;

          letter.style.transform = `
            translate3d(
              ${currentX}px,
              ${currentY}px,
              0
            )
            rotate(${rotate}deg)
            scale(${isDragging ? 1.08 : 1})
          `;

          frameId =
            requestAnimationFrame(
              animate
            );
        };

        frameId =
          requestAnimationFrame(
            animate
          );

        const onPointerDown =
          (e: PointerEvent) => {

            isDragging = true;

            letter.classList.add(
              'dragging'
            );

            startX =
              e.clientX - targetX;

            startY =
              e.clientY - targetY;

            letter.setPointerCapture(
              e.pointerId
            );

            document.body.style.userSelect =
              'none';
          };

        const onPointerMove =
          (e: PointerEvent) => {

            if (!isDragging) {
              return;
            }

            targetX =
              e.clientX - startX;

            targetY =
              e.clientY - startY;
          };

        const onPointerUp = () => {

          isDragging = false;

          letter.classList.remove(
            'dragging'
          );

          targetX = 0;
          targetY = 0;

          document.body.style.userSelect =
            '';
        };

        letter.addEventListener(
          'pointerdown',
          onPointerDown
        );

        window.addEventListener(
          'pointermove',
          onPointerMove
        );

        window.addEventListener(
          'pointerup',
          onPointerUp
        );

        window.addEventListener(
          'pointercancel',
          onPointerUp
        );

        this.cleanupFns.push(() => {

          cancelAnimationFrame(
            frameId
          );

          letter.removeEventListener(
            'pointerdown',
            onPointerDown
          );

          window.removeEventListener(
            'pointermove',
            onPointerMove
          );

          window.removeEventListener(
            'pointerup',
            onPointerUp
          );

          window.removeEventListener(
            'pointercancel',
            onPointerUp
          );

        });

      }
    );
  }

  /* =========================
     HELPERS
  ========================= */

  getRemainingDays(
    date: string
  ): number {

    const end =
      new Date(date).getTime();

    const now =
      Date.now();

    return Math.max(
      Math.ceil(
        (end - now) /
        (1000 * 60 * 60 * 24)
      ),
      0
    );
  }

}