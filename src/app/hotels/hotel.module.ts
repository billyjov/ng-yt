import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { RemoveCommaPipe } from '../shared/pipes/remove-comma.pipe';
import { HotelDetailsGuard } from './shared/guards/hotel-details.guard';

import { SharedModule } from '../shared/shared.module';
import { HotelRoutingModule } from './hotel-routing.module';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';

@NgModule({
  declarations: [
    HotelListComponent,
    HotelDetailsComponent,
    RemoveCommaPipe,
    HotelEditComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HotelRoutingModule,

  ]
})
export class HotelModule { }
