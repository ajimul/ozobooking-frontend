import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerSignupComponent } from './partner-signup.component';

describe('AppClientSignupComponent', () => {
  let component: PartnerSignupComponent;
  let fixture: ComponentFixture<PartnerSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerSignupComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PartnerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
