import { TestBed } from '@angular/core/testing';

import { FlightRegisterService } from './flight-register.service';

describe('FlightRegisterService', () => {
  let service: FlightRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
