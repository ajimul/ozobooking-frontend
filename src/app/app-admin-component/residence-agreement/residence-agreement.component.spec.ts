import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceAgreementComponent } from './residence-agreement.component';

describe('ResidenceAgreementComponent', () => {
  let component: ResidenceAgreementComponent;
  let fixture: ComponentFixture<ResidenceAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidenceAgreementComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResidenceAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
