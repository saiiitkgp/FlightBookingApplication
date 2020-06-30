import { TestBed } from '@angular/core/testing';

import { FlightLoginService } from './flight-login.service';

describe('FlightLoginService', () => {
  let service: FlightLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
