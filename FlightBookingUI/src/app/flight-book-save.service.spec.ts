import { TestBed } from '@angular/core/testing';

import { FlightBookSaveService } from './flight-book-save.service';

describe('FlightBookSaveService', () => {
  let service: FlightBookSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightBookSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
