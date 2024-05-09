import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoomAmenitiesServiceComponent } from './app-room-amenities-service.component';

describe('AppRoomAmenitiesServiceComponent', () => {
  let component: AppRoomAmenitiesServiceComponent;
  let fixture: ComponentFixture<AppRoomAmenitiesServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoomAmenitiesServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppRoomAmenitiesServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
