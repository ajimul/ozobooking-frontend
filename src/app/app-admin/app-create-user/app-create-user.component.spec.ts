import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCreateUserComponent } from './app-create-user.component';

describe('AppCreateUserComponent', () => {
  let component: AppCreateUserComponent;
  let fixture: ComponentFixture<AppCreateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCreateUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppCreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
