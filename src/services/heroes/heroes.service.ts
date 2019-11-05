import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HashingService } from './../hashing/hashing.service';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  readonly endpoints = {
    heroes: 'https://gateway.marvel.com/v1/public/characters'
  };

  constructor(
    private http: HttpClient,
    private hashingService: HashingService
  ) {}

  defineParams() {
    const params = new HttpParams()
      .set('ts', this.hashingService.getTimestamp())
      .set('apikey', this.hashingService.publicKey)
      .set('hash', this.hashingService.hashKeys());
    return params;
  }

  fetchHeroes() {
    const params = this.defineParams();

    return this.http.get(this.endpoints.heroes, { params }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  fetchHero(id) {
    const params = this.defineParams();

    return this.http.get(`${this.endpoints.heroes}/${id}`, { params }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, body was: `, error);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
