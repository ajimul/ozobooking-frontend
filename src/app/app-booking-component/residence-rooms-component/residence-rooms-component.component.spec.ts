import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceRoomsComponentComponent } from './residence-rooms-component.component';

describe('ResidenceRoomsComponentComponent', () => {
  let component: ResidenceRoomsComponentComponent;
  let fixture: ComponentFixture<ResidenceRoomsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidenceRoomsComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResidenceRoomsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
