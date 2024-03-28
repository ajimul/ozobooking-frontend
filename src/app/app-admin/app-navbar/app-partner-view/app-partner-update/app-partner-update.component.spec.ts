import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPartnerUpdateComponent } from './app-partner-update.component';

describe('AppPartnerUpdateComponent', () => {
  let component: AppPartnerUpdateComponent;
  let fixture: ComponentFixture<AppPartnerUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPartnerUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppPartnerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
