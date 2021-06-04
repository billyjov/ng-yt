import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, fromEvent, merge, EMPTY, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';
import { NumberValidators } from '../shared/validators/number.validator';
import { GenericGlobalValidator } from '../shared/validators/generic-global.validator';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) inputElements: ElementRef[];

  public hotelForm: FormGroup;
  public errorMessage: string;
  public formErrors: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } } = {
    hotelName: {
      required: 'Le nom de l\'hôtel est obligatoire.',
      minlength: 'Le nom de l\'hôtel doit comporter au moins trois caractères.',
      maxlength: 'Le nom de l\'hôtel ne peut pas dépasser 50 caractères.'
    },
    price: {
      required: 'le prix de l\'hôtel est obligatoire.',
      pattern: 'Veuillez entrer un nombre svp.'
    },
    rating: {
      range: 'Donnez une note à l\'hôtel entre 1 (le plus bas) et 5 (le plus élevé).'
    }
  };
  public hotel: IHotel;
  public pageTitle: string;

  private globalGenericValidator: GenericGlobalValidator;
  private isFormSubmitted: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private hotelService: HotelListService

  ) { }

  ngOnInit(): void {
    this.globalGenericValidator = new GenericGlobalValidator(this.validationMessages);

    // first attempt
    // this.formErrors = this.globalGenericValidator.createErrorMessages(this.hotelForm);

    this.hotelForm = this.fb.group({
      hotelName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      price: [
        '',
        [
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)
        ]
      ],
      rating: ['', NumberValidators.range(1, 5)],
      tags: this.fb.array([]),
      description: ''
    });

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');

      this.getSelectedHotel(id);
    })
  }

  ngAfterViewInit() {
    // without RxJS => changeDetection Error
    // this.formErrors = this.globalGenericValidator.createErrorMessages(this.hotelForm);

    this.validateForm();
  }

  public hideErrorMessage(): void {
    this.errorMessage = null;
  }

  public getSelectedHotel(id: number): void {
    this.hotelService.getHotelById(id).subscribe({
      next: (hotel: IHotel) => this.displayHotel(hotel),
      error: (err) => this.errorMessage = err
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
      description: this.hotel.description,
    });
    this.hotelForm.setControl('tags', this.fb.array(this.hotel.tags || []));
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

    this.isFormSubmitted = true;
    this.hotelForm.updateValueAndValidity({
      onlySelf: true,
      emitEvent: true
    });

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
      this.errorMessage = `Corrigez les erreurs svp.`;
    }
  }

  public deleteHotel(): void {

    if (this.hotel.id === 0) {
      this.saveCompleted();
    } else {
      if (confirm(`Voulez-vous réelement supprimer ${this.hotel.hotelName} ?`)) {
        this.hotelService.deleteHotel(this.hotel.id).subscribe({
          next: () => this.saveCompleted(),
          error: (err) => this.errorMessage = err
        });
      }
    }

  }


  public saveCompleted(): void {
    this.hotelForm.reset();
    this.router.navigate(['/hotels']);
  }

  public validateForm(): void {
    const formControlBlurs: Observable<unknown>[] = this.inputElements
      .map((formControlElemRef: ElementRef) => fromEvent(formControlElemRef.nativeElement, 'blur'));

    merge(this.hotelForm.valueChanges, ...formControlBlurs).pipe(
      // debounceTime(300)
      debounce(() => this.isFormSubmitted ? EMPTY : timer(300))
    ).subscribe(() => {
      this.formErrors = this.globalGenericValidator.createErrorMessages(this.hotelForm, this.isFormSubmitted);
      console.log('value on subscribe errors: ', this.formErrors);
    });
  }

}
