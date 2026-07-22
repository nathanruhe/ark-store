import { Component, AfterViewInit, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {

  private ticking = false;
  private scrollY = 0;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.initReveal();
    this.initParallax();
  }

  /* =========================
     REVEAL SYSTEM
  ========================= */

  private initReveal(): void {

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.2 }
    );

    this.el.nativeElement
      .querySelectorAll('.reveal')
      .forEach((el: Element) => observer.observe(el));
  }

  /* =========================
     PARALLAX (VISION PRO SAFE)
  ========================= */

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrollY = window.scrollY;

    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.updateParallax();
        this.ticking = false;
      });

      this.ticking = true;
    }
  }

  private initParallax(): void {
    this.updateParallax();
  }

  private updateParallax(): void {
    const items = this.el.nativeElement.querySelectorAll('.parallax');

    items.forEach((item: HTMLElement) => {
      const speed = parseFloat(item.dataset['speed'] || '0.2');
      const y = this.scrollY * speed;

      item.style.transform = `translate3d(0, ${y}px, 0) scale(1.05)`;
    });

    /* 🔥 FIX scene inner (NO BREAK LAYOUT) */
    const sceneInner = this.el.nativeElement.querySelectorAll('.scene-image-inner');

    sceneInner.forEach((item: HTMLElement) => {
      const speed = 0.15;
      const y = this.scrollY * speed;

      item.style.transform = `translate3d(0, ${y}px, 0) scale(1.1)`;
    });
  }
}