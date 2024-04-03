import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppResidenceAmentitiesServiceComponent } from './app-residence-amentities-service.component';

describe('AppResidenceAmentitiesServiceComponent', () => {
  let component: AppResidenceAmentitiesServiceComponent;
  let fixture: ComponentFixture<AppResidenceAmentitiesServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppResidenceAmentitiesServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppResidenceAmentitiesServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
