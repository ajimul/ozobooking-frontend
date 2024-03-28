import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPartnerAgreementComponent } from './app-partner-agreement.component';

describe('AppPartnerAgreementComponent', () => {
  let component: AppPartnerAgreementComponent;
  let fixture: ComponentFixture<AppPartnerAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPartnerAgreementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppPartnerAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
