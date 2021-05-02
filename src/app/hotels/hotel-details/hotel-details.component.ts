import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';

@Component({
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {

  public hotel: IHotel = <IHotel>{};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelListService: HotelListService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.hotelListService.getHotels().subscribe((hotels: IHotel[]) => {
      this.hotel = hotels.find((hotel: IHotel) => hotel.id === id);
    })
  }

  public backToList(): void {
    this.router.navigate(['/hotels']);
  }

}
