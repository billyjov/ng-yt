import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges {


  public starWidth: number;
  public rating: number = 4;

  constructor() { }

  ngOnChanges(): void {
    this.starWidth = this.rating * 125 / 5;
  }

}
