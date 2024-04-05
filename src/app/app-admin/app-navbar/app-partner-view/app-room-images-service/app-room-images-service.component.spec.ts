import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoomImagesServiceComponent } from './app-room-images-service.component';

describe('AppRoomImagesServiceComponent', () => {
  let component: AppRoomImagesServiceComponent;
  let fixture: ComponentFixture<AppRoomImagesServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoomImagesServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppRoomImagesServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
