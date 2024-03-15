import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppClientSignupComponent } from './app-client-signup.component';

describe('AppClientSignupComponent', () => {
  let component: AppClientSignupComponent;
  let fixture: ComponentFixture<AppClientSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppClientSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppClientSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
