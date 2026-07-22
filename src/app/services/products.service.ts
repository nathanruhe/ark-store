import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly api =
    `${environment.apiUrl}/products`;

  private products$?: Observable<Product[]>;

  constructor(
    private http: HttpClient
  ) {}

  getProducts(): Observable<Product[]> {

    if (!this.products$) {

      this.products$ = this.http
        .get<Product[]>(this.api)
        .pipe(
          shareReplay(1)
        );

    }

    return this.products$;

  }


  getProduct(ref: string): Observable<Product> {

    return this.http.get<Product>(
      `${this.api}/${ref}`
    );

  }


  getRelatedProducts(ref: string): Observable<Product[]> {

    return this.http.get<Product[]>(
      `${this.api}/${ref}/related`
    );

  }


  clearCache(): void {
    this.products$ = undefined;
  }

}