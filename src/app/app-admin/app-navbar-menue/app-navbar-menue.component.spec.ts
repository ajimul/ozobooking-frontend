import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavbarMenueComponent } from './app-navbar-menue.component';

describe('AppNavbarMenueComponent', () => {
  let component: AppNavbarMenueComponent;
  let fixture: ComponentFixture<AppNavbarMenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppNavbarMenueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppNavbarMenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
