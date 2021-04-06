import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from '../shared/models/hotel';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit {

  public hotelForm: FormGroup;
  public errorMessage: string;
  public hotel: IHotel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
      hotelName: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]
      ],
      hotelPrice: ['', Validators.required],
      starRating: [''],
      tags: this.fb.array([]),
      description: ''
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
    this.router.navigate(['/products']);
  }

}
