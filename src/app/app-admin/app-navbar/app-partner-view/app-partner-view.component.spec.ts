import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPartnerViewComponent } from './app-partner-view.component';

describe('AppPartnerViewComponent', () => {
  let component: AppPartnerViewComponent;
  let fixture: ComponentFixture<AppPartnerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPartnerViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppPartnerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
