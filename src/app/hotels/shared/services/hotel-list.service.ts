import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IHotel } from '../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelListService {

  private readonly HOTEL_API_URL = 'api/hotels.json'
  constructor(private http: HttpClient) { }

  public getHotels(): Observable<IHotel[]> {
    return this.http.get<IHotel[]>(this.HOTEL_API_URL).pipe(
      catchError(this.handleHttpError)
    );
  }

  public getHotelById(id: number): Observable<IHotel> {
    if (id === 0) {
      return of(this.getDefaultHotel());
    }
    return this.getHotels().pipe(
      map(hotels => hotels.find(hotel => hotel.hotelId === id)),
    );
  }

  private getDefaultHotel(): IHotel {
    return {
      hotelId: 0,
      hotelName: null,
      description: null,
      price: null,
      rating: null,
      imageUrl: null
    };
  }


  private handleHttpError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${err.status}, ` +
        `body was: ${err.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
