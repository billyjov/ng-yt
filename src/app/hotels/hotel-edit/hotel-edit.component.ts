import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit {

  public hotelForm: FormGroup;
  public errorMessage: string;
  public hotel: IHotel;
  public pageTitle: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private hotelService: HotelListService

  ) { }

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
      hotelName: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]
      ],
      price: ['', Validators.required],
      rating: [''],
      tags: this.fb.array([]),
      description: ''
    });

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');

      this.getSelectedHotel(id);
    })
  }

  public getSelectedHotel(id: number): void {
    this.hotelService.getHotelById(id).subscribe(hotel => {
      this.displayHotel(hotel);
    });
  }

  public displayHotel(hotel: IHotel): void {
    this.hotel = hotel;

    if (this.hotel.id === 0) {
      this.pageTitle = 'Créer un hotel';
    } else {
      this.pageTitle = `Modifier l\'hotel ${this.hotel.hotelName}`;
    }

    this.hotelForm.patchValue({
      hotelName: this.hotel.hotelName,
      price: this.hotel.price,
      rating: this.hotel.rating,
      description: this.hotel.description
    });

  }

  public get tags(): FormArray {
    return this.hotelForm.get('tags') as FormArray;
  }

  public addTag(): void {
    this.tags.push(new FormControl());
  }

  public deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  public saveHotel(): void {
    if (this.hotelForm.valid) {
      if (this.hotelForm.dirty) {
        const hotel: IHotel = {
          ...this.hotel,
          ...this.hotelForm.value
        };

        // add or edit logic
        if (hotel.id === 0) {
          this.hotelService.createHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
            error: (err) => this.errorMessage = err
          });
        } else {
          this.hotelService.updateHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
            error: (err) => this.errorMessage = err
          });
        }
      } else {
        this.saveCompleted();
      }
    } else {
      this.errorMessage = 'Corrigez les erreurs svp.';
    }
  }

  public deleteHotel(): void {

  }


  public saveCompleted(): void {
    this.hotelForm.reset();
    this.router.navigate(['/hotels']);
  }

}
