import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

import { environment } from '../../environments/environment';
import { Drop } from '../models/drop.model';

@Injectable({
  providedIn: 'root'
})
export class DropsService {

  private readonly api =
    `${environment.apiUrl}/drops`;

  private drops$?: Observable<Drop[]>;


  constructor(
    private http: HttpClient
  ) {}


  getDrops(): Observable<Drop[]> {

    if (!this.drops$) {

      this.drops$ = this.http
        .get<Drop[]>(this.api)
        .pipe(
          shareReplay(1)
        );

    }

    return this.drops$;

  }


  getDrop(ref: string): Observable<Drop> {

    return this.http.get<Drop>(
      `${this.api}/${ref}`
    );

  }


  clearCache(): void {

    this.drops$ = undefined;

  }

}