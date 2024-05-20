import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomImagesServiceComponent } from './room-images-service.component';

describe('RoomImagesServiceComponent', () => {
  let component: RoomImagesServiceComponent;
  let fixture: ComponentFixture<RoomImagesServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomImagesServiceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoomImagesServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
