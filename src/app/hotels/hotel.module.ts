import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { RemoveCommaPipe } from '../shared/pipes/remove-comma.pipe';
import { HotelDetailsGuard } from './shared/guards/hotel-details.guard';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HotelListComponent,
    HotelDetailsComponent,
    RemoveCommaPipe
  ],
  imports: [
    RouterModule.forChild([
      {
        path: 'hotels/:id', component: HotelDetailsComponent,
        canActivate: [HotelDetailsGuard]
      },
      { path: 'hotels', component: HotelListComponent },
    ]),
    FormsModule,
    SharedModule
  ]
})
export class HotelModule { }
