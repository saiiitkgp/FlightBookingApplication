import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightLoginComponent } from './flight-login.component';

describe('FlightLoginComponent', () => {
  let component: FlightLoginComponent;
  let fixture: ComponentFixture<FlightLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
