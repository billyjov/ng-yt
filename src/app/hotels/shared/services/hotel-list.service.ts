import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IHotel } from '../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelListService {

  private readonly HOTEL_API_URL = 'api/hotels'
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

    return this.http.get<IHotel>(`${this.HOTEL_API_URL}/${id}`).pipe(
      catchError(this.handleHttpError)
    );
  }

  public createHotel(hotel: IHotel): Observable<IHotel> {
    hotel = {
      ...hotel,
      imageUrl: 'assets/img/window.jpg',
      id: null
    };
    return this.http.post<IHotel>(this.HOTEL_API_URL, hotel).pipe(
      catchError(this.handleHttpError)
    )
  }

  public updateHotel(hotel: IHotel): Observable<IHotel> {
    const url = `${this.HOTEL_API_URL}/${hotel.id}`;

    return this.http.put<IHotel>(url, hotel).pipe(
      catchError(this.handleHttpError)
    );
  }

  public deleteHotel(id: number): Observable<{}> {
    const url = `${this.HOTEL_API_URL}/${id}`;

    return this.http.delete<IHotel>(url).pipe(
      catchError(this.handleHttpError)
    );
  }

  private getDefaultHotel(): IHotel {
    return {
      id: 0,
      hotelName: null,
      description: null,
      price: null,
      rating: null,
      imageUrl: null
    };
  }


  private handleHttpError(err: HttpErrorResponse) {
    let error: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', err.error.message);
      error = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${err.status}, ` +
        `body was: ${err.error}`
      );
      error = `Backend returned code ${err.status}, body was: ${err.error}`;
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.'
      + '\n'
      + error
    );
  }
}
