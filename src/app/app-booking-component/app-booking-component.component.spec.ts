import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBookingComponentComponent } from './app-booking-component.component';

describe('AppBookingComponentComponent', () => {
  let component: AppBookingComponentComponent;
  let fixture: ComponentFixture<AppBookingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppBookingComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppBookingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
