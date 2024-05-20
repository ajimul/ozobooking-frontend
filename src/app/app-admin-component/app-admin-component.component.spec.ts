import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAdminComponentComponent } from './app-admin-component.component';

describe('AppAdminComponentComponent', () => {
  let component: AppAdminComponentComponent;
  let fixture: ComponentFixture<AppAdminComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppAdminComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppAdminComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
