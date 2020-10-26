import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StarRatingComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StarRatingComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
