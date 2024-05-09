import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppResidenceAmenitiesServiceComponent } from './app-residence-amenities-service.component';

describe('AppResidenceAmenitiesServiceComponent', () => {
  let component: AppResidenceAmenitiesServiceComponent;
  let fixture: ComponentFixture<AppResidenceAmenitiesServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppResidenceAmenitiesServiceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AppResidenceAmenitiesServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
