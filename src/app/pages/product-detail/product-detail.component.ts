import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

type DetailProduct = Omit<Product, 'gallery'> & {
  gallery: string[];
};

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  product: DetailProduct | null = null;
  relatedProducts: Product[] = [];

  currentIndex = 0;
  private autoplayTimer: ReturnType<typeof setTimeout> | null = null;

  touchStartX = 0;
  mouseStartX = 0;

  zoomOpen = false;

  readonly storyDuration = 3500;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const ref = params.get('ref');

      if (ref) {
        this.loadProduct(ref);
      }

    });

  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }


  /* =========================
     LOAD PRODUCT
  ========================= */

  private loadProduct(ref: string): void {

    this.productsService.getProduct(ref).subscribe({

      next: (product) => {

        this.stopAutoplay();
        this.zoomOpen = false;

        this.product = {
          ...product,
          gallery: product.gallery?.length
            ? product.gallery
            : []
        };

        this.currentIndex = 0;

        if (this.product.gallery.length > 1) {
          this.startAutoplay();
        }

        // Cargar productos relacionados
        this.loadRelatedProducts(product.ref);

      },

      error: error => {

        console.error(error);

        this.router.navigate(['/products']);

      }

    });

  }


  /* =========================
     LOAD RELATED PRODUCTS
  ========================= */

  private loadRelatedProducts(ref: string): void {

    this.productsService.getRelatedProducts(ref)
      .subscribe({

        next: (products) => {

          this.relatedProducts = products;

        },

        error: error => {

          console.error(
            'Error cargando productos relacionados',
            error
          );

          this.relatedProducts = [];

        }

      });

  }


  /* =========================
     INSTAGRAM DM
  ========================= */

  async openInstagramDM(): Promise<void> {

    if (!this.product) return;

    const message =
`Hola, me interesa este producto:

${this.product.brand} - ${this.product.name}

Ref: ${this.product.ref}
Precio: ${this.product.price}€

${window.location.href}`;

    const copied = await this.copyMessageToClipboard(message);

    if (!copied) {
      console.warn('No se pudo copiar el mensaje automáticamente.');
    }

    setTimeout(() => {
      window.open('https://ig.me/m/a.r.k.shop', '_blank');
    }, 150);

  }


  /* =========================
     COPY HELPER
  ========================= */

  private async copyMessageToClipboard(
    text: string
  ): Promise<boolean> {

    try {

      if (navigator.clipboard && window.isSecureContext) {

        await navigator.clipboard.writeText(text);
        return true;

      }

      const textarea = document.createElement('textarea');

      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.opacity = '0';

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      const ok = document.execCommand('copy');

      document.body.removeChild(textarea);

      return ok;

    } catch (error) {

      console.error(
        'Error copiando al portapapeles:',
        error
      );

      return false;

    }

  }


  /* =========================
     IMAGE
  ========================= */

  get currentImage(): string {

    if (!this.product) return '';

    return this.product.gallery[this.currentIndex] || '';

  }


  /* =========================
     AUTOPLAY
  ========================= */

  startAutoplay(): void {

    this.stopAutoplay();

    if (
      !this.product ||
      this.product.gallery.length <= 1
    ) return;

    this.autoplayTimer = setTimeout(() => {

      this.next();

    }, this.storyDuration);

  }


  stopAutoplay(): void {

    if (this.autoplayTimer) {

      clearTimeout(this.autoplayTimer);
      this.autoplayTimer = null;

    }

  }


  restartAutoplay(): void {

    this.stopAutoplay();
    this.startAutoplay();

  }


  /* =========================
     NAVIGATION
  ========================= */

  next(): void {

    if (!this.product) return;

    this.currentIndex++;

    if (
      this.currentIndex >= this.product.gallery.length
    ) {

      this.currentIndex = 0;

    }

    this.restartAutoplay();

  }


  prev(): void {

    if (!this.product) return;

    this.currentIndex--;

    if (this.currentIndex < 0) {

      this.currentIndex =
        this.product.gallery.length - 1;

    }

    this.restartAutoplay();

  }


  /* =========================
     SWIPE
  ========================= */

  onTouchStart(event: TouchEvent): void {

    this.touchStartX =
      event.touches[0].clientX;

    this.stopAutoplay();

  }


  onTouchEnd(event: TouchEvent): void {

    const diff =
      event.changedTouches[0].clientX -
      this.touchStartX;

    if (diff < -40) this.next();
    if (diff > 40) this.prev();

    this.restartAutoplay();

  }


  onMouseDown(event: MouseEvent): void {

    this.mouseStartX = event.clientX;

    this.stopAutoplay();

  }


  onMouseUp(event: MouseEvent): void {

    const diff =
      event.clientX -
      this.mouseStartX;

    if (diff < -40) this.next();
    if (diff > 40) this.prev();

    this.restartAutoplay();

  }


  /* =========================
     PROGRESS
  ========================= */

  trackByIndex(index: number): number {

    return index;

  }


  /* =========================
     ZOOM
  ========================= */

  openZoom(): void {

    this.zoomOpen = true;

  }


  closeZoom(): void {

    this.zoomOpen = false;

  }


  /* =========================
     RELATED NAVIGATION
  ========================= */

  goToProduct(ref: string): void {

    this.router.navigate(['/product', ref])
      .then(() => {

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

      });

  }

}