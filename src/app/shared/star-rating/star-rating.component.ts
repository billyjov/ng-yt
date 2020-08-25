import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges {


  public starWidth: number;

  @Input()
  public rating: number;

  constructor() { }

  ngOnChanges(): void {
    this.starWidth = this.rating * 125 / 5;
  }

}
