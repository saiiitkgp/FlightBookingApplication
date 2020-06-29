import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightRegisterComponent } from './flight-register.component';

describe('FlightRegisterComponent', () => {
  let component: FlightRegisterComponent;
  let fixture: ComponentFixture<FlightRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
