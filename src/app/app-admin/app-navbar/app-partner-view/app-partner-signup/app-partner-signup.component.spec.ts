import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPartnerSignupComponent } from './app-partner-signup.component';

describe('AppPartnerSignupComponent', () => {
  let component: AppPartnerSignupComponent;
  let fixture: ComponentFixture<AppPartnerSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPartnerSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppPartnerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
