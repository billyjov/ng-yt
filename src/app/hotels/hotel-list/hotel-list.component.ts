import { Component, OnInit } from '@angular/core';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  public hotels: IHotel[] = [];

  public showBadge: boolean = true;
  public filteredHotels: IHotel[];
  public receivedRating: string;
  _hotelFilter = 'mot';

  public errorMsg: string;


  // Methode longue
  // private _hotelListService;
  // constructor(hotelListService: HotelListService) {
  //   this._hotelListService = hotelListService;
  // }

  // racourci typescript
  constructor(private hotelListService: HotelListService){}

  ngOnInit() {
    // code for lifecycle hook
    this.hotelListService.getHotels().subscribe({
      next: hotels => {
        this.hotels = hotels;
        this.filteredHotels = this.hotels;
      },
      error: err => this.errorMsg = err
    });
    this.hotelFilter = '';
  }

  public toggleIsNewBadge(): void {
    this.showBadge = !this.showBadge;
  }

  get hotelFilter(): string {
    return this._hotelFilter;
  }

  set hotelFilter(filter: string) {
    this._hotelFilter = filter;
    this.filteredHotels = this.hotelFilter ? this.filterHotels(this.hotelFilter) : this.hotels;
  }

  public receiveRatingClick(message: string): void {
    this.receivedRating = message;
    console.log(message);
  }


  private filterHotels(criteria: string): IHotel[] {
    criteria = criteria.toLocaleLowerCase();

    const res = this.hotels.filter(
      (hotel: IHotel) => hotel.hotelName.toLocaleLowerCase().indexOf(criteria) !== -1
    );

    return res;

  }

}
