import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelEditComponent } from './hotel-edit.component';

describe('HotelEditComponent', () => {
  let component: HotelEditComponent;
  let fixture: ComponentFixture<HotelEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
