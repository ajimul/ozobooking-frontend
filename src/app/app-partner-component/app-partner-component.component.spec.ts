import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPartnerComponentComponent } from './app-partner-component.component';

describe('AppPartnerComponentComponent', () => {
  let component: AppPartnerComponentComponent;
  let fixture: ComponentFixture<AppPartnerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPartnerComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppPartnerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
