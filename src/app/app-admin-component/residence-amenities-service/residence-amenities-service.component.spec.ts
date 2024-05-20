import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceAmenitiesServiceComponent } from './residence-amenities-service.component';

describe('ResidenceAmenitiesServiceComponent', () => {
  let component: ResidenceAmenitiesServiceComponent;
  let fixture: ComponentFixture<ResidenceAmenitiesServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidenceAmenitiesServiceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResidenceAmenitiesServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
