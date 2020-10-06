import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { RemoveCommaPipe } from './shared/pipes/remove-comma.pipe';
import { StarRatingComponent } from './shared/star-rating/star-rating.component';
import { HomeComponent } from './home/home.component';
import { HotelDetailsComponent } from './hotel-list/hotel-details/hotel-details.component';
import { RouterModule } from '@angular/router';
import { HotelDetailsGuard } from './hotel-list/hotel-details.guard';


registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HotelListComponent,
    RemoveCommaPipe,
    StarRatingComponent,
    HomeComponent,
    HotelDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'hotels/:id', component: HotelDetailsComponent,
        canActivate: [HotelDetailsGuard]
      },
      { path: 'hotels', component: HotelListComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
