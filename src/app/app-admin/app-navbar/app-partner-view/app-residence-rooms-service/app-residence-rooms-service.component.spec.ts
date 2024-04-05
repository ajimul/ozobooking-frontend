import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppResidenceRoomsServiceComponent } from './app-residence-rooms-service.component';

describe('AppResidenceRoomsServiceComponent', () => {
  let component: AppResidenceRoomsServiceComponent;
  let fixture: ComponentFixture<AppResidenceRoomsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppResidenceRoomsServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppResidenceRoomsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
