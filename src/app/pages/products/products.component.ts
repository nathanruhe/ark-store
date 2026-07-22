import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef
} from '@angular/core';

import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';

import {
  Product,
  ProductCategory,
  ProductGender,
  AccessoryType
} from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  searchText = '';

  selectedCategory: ProductCategory | 'all' = 'all';
  selectedBrand = 'all';
  selectedGender: ProductGender | 'all' = 'all';
  selectedAccessoryType: AccessoryType | 'all' = 'all';

  sortBy = 'default';

  categories: (ProductCategory | 'all')[] = [];
  accessoryTypes: (AccessoryType | 'all')[] = [];
  brands: string[] = [];

  open = {
    category: false,
    accessory: true,
    brand: false,
    gender: false,
    sort: false,
  };

  mobileFiltersOpen = false;

  private observer?: IntersectionObserver;


  constructor(
    private router: Router,
    private el: ElementRef,
    private productsService: ProductsService
  ) {
    console.log('CONSTRUCTOR ProductsComponent', Math.random());
  }


  ngOnInit(): void {

    console.log('1 - PRODUCT COMPONENT');

    console.log('2 - ANTES DEL SUBSCRIBE');

    this.productsService.getProducts().subscribe({

      next: (products) => {

        console.log('3 - DENTRO DEL SUBSCRIBE');

        console.log('Productos recibidos:', products);

        this.products = products;

        console.log('4 - Antes de applyFilters');

        this.applyFilters();

        console.log('5 - Después de applyFilters');

        this.categories = [
          'all',
          ...Array.from(
            new Set(products.map(p => p.category))
          ).sort((a, b) => a.localeCompare(b))
        ];

        this.brands = [
          'all',
          ...Array.from(
            new Set(products.map(p => p.brand))
          ).sort((a, b) => a.localeCompare(b))
        ];

        this.accessoryTypes = [
          'all',
          ...Array.from(
            new Set(
              products
                .filter(p => p.category === 'accesorios')
                .map(p => p.accessoryType!)
            )
          ).sort((a, b) => a.localeCompare(b))
        ];

        console.log('6 - Categorías:', this.categories);
        console.log('7 - Marcas:', this.brands);
        console.log('8 - Productos filtrados:', this.filteredProducts);

        setTimeout(() => {
          console.log('9 - initObserver');
          this.initObserver();
        }, 0);

      },

      error: err => {
        console.error('ERROR:', err);
      }

    });

  }


  ngAfterViewInit(): void {
    this.initObserver();
  }


  ngOnDestroy(): void {
    console.log('DESTROY ProductsComponent');
    if (this.observer) {
      this.observer.disconnect();
    }

  }



  toggle(section: keyof typeof this.open): void {
    this.open[section] = !this.open[section];
  }


  toggleMobileFilters(): void {
    this.mobileFiltersOpen = !this.mobileFiltersOpen;
  }


  resetFilters(): void {

    this.searchText = '';
    this.selectedCategory = 'all';
    this.selectedBrand = 'all';
    this.selectedGender = 'all';
    this.selectedAccessoryType = 'all';
    this.sortBy = 'default';

    this.open = {
      category: false,
      accessory: true,
      brand: false,
      gender: false,
      sort: false,
    };

    this.applyFilters();

  }



  selectCategory(category: ProductCategory | 'all'): void {

    this.selectedCategory = category;

    if (category === 'accesorios') {
      this.open.accessory = true;
    } else {
      this.selectedAccessoryType = 'all';
    }

    this.applyFilters();

  }



  selectAccessoryType(type: AccessoryType | 'all'): void {

    this.selectedAccessoryType = type;

    this.applyFilters();

  }



  selectBrand(brand: string): void {

    this.selectedBrand = brand;

    this.applyFilters();

  }



  selectGender(gender: ProductGender | 'all'): void {

    this.selectedGender = gender;

    this.applyFilters();

  }



  setSort(sort: string): void {

    this.sortBy = sort;

    this.applyFilters();

  }



  onChange(): void {

    this.applyFilters();

  }



  applyFilters(): void {

    console.log('APPLY FILTERS EJECUTADO');
console.log('Productos:', this.products);

    let result = [...this.products];

    const search = this.searchText.trim().toLowerCase();

    if (search.length > 0) {

      result = result.filter((product: Product) => {

        const category =
          product.category.toLowerCase();

        const accessoryType =
          product.accessoryType?.toLowerCase() ?? '';


        return (

          product.name
            .toLowerCase()
            .includes(search)

          ||

          product.brand
            .toLowerCase()
            .includes(search)

          ||

          category.includes(search)

          ||

          accessoryType.includes(search)

          ||

          product.ref
            .toLowerCase()
            .includes(search)

        );

      });

    }



    if (this.selectedCategory !== 'all') {

      result = result.filter(
        product =>
          product.category === this.selectedCategory
      );

    }



    if (
      this.selectedCategory === 'accesorios' &&
      this.selectedAccessoryType !== 'all'
    ) {

      result = result.filter(
        product =>
          product.accessoryType === this.selectedAccessoryType
      );

    }



    if (this.selectedBrand !== 'all') {

      result = result.filter(
        product =>
          product.brand === this.selectedBrand
      );

    }



    if (this.selectedGender !== 'all') {

      result = result.filter(
        product =>
          product.gender === this.selectedGender
      );

    }



    if (this.sortBy === 'priceLow') {

      result.sort(
        (a,b) => a.price - b.price
      );

    }



    if (this.sortBy === 'priceHigh') {

      result.sort(
        (a,b) => b.price - a.price
      );

    }

    console.log({
      total: this.products.length,
      filtrados: result.length,
      categoria: this.selectedCategory,
      marca: this.selectedBrand,
      genero: this.selectedGender,
      accesorio: this.selectedAccessoryType,
      busqueda: this.searchText
    });

    this.filteredProducts = result;

    console.log('Productos filtrados:', this.filteredProducts, "hola");


    setTimeout(() => {

      this.initObserver();

    }, 0);

  }



  private initObserver(): void {


    if (this.observer) {

      this.observer.disconnect();

    }


    this.observer = new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add('active');

            this.observer?.unobserve(
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


    if (!elements.length) {
      return;
    }


    elements.forEach((el: Element) => {

      this.observer?.observe(el);

    });


  }



  goToDetail(ref: string): void {

    this.router.navigate([
      '/product',
      ref
    ]);

  }

}