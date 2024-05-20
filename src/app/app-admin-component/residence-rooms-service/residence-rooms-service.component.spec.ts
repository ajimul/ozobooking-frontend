import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceRoomsServiceComponent } from './residence-rooms-service.component';

describe('ResidenceRoomsServiceComponent', () => {
  let component: ResidenceRoomsServiceComponent;
  let fixture: ComponentFixture<ResidenceRoomsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidenceRoomsServiceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResidenceRoomsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
