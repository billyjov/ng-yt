import { TestBed } from '@angular/core/testing';

import { HotelListService } from './hotel-list.service';

describe('HotelListService', () => {
  let service: HotelListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
