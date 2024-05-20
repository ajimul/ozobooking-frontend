import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAmenitiesServiceComponent } from './room-amenities-service.component';

describe('RoomAmenitiesServiceComponent', () => {
  let component: RoomAmenitiesServiceComponent;
  let fixture: ComponentFixture<RoomAmenitiesServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomAmenitiesServiceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoomAmenitiesServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
