import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoomAmentitiesServiceComponent } from './app-room-amentities-service.component';

describe('AppRoomAmentitiesServiceComponent', () => {
  let component: AppRoomAmentitiesServiceComponent;
  let fixture: ComponentFixture<AppRoomAmentitiesServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoomAmentitiesServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppRoomAmentitiesServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
