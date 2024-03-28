import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppResidenceImageServiceComponent } from './app-residence-image-service.component';

describe('AppResidenceImageServiceComponent', () => {
  let component: AppResidenceImageServiceComponent;
  let fixture: ComponentFixture<AppResidenceImageServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppResidenceImageServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppResidenceImageServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
