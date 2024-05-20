import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPolicyServiceComponent } from './room-policy-service.component';

describe('RoomPolicyServiceComponent', () => {
  let component: RoomPolicyServiceComponent;
  let fixture: ComponentFixture<RoomPolicyServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomPolicyServiceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoomPolicyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
