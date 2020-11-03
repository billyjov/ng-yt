import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { RemoveCommaPipe } from '../shared/pipes/remove-comma.pipe';
import { HotelDetailsGuard } from './shared/guards/hotel-details.guard';

import { SharedModule } from '../shared/shared.module';
import { HotelRoutingModule } from './hotel-routing.module';

@NgModule({
  declarations: [
    HotelListComponent,
    HotelDetailsComponent,
    RemoveCommaPipe
  ],
  imports: [
    FormsModule,
    SharedModule,
    HotelRoutingModule
  ]
})
export class HotelModule { }
