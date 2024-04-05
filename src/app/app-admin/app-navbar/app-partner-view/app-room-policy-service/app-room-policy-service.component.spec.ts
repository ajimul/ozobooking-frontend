import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoomPolicyServiceComponent } from './app-room-policy-service.component';

describe('AppRoomPolicyServiceComponent', () => {
  let component: AppRoomPolicyServiceComponent;
  let fixture: ComponentFixture<AppRoomPolicyServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoomPolicyServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppRoomPolicyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
