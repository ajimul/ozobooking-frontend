import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppResidenceLocationServiceComponent } from './app-residence-location-service.component';

describe('AppResidenceLocationServiceComponent', () => {
  let component: AppResidenceLocationServiceComponent;
  let fixture: ComponentFixture<AppResidenceLocationServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppResidenceLocationServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppResidenceLocationServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
