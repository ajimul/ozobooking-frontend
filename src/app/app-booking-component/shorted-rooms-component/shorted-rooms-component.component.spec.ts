import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortedRoomsComponentComponent } from './shorted-rooms-component.component';

describe('ShortedRoomsComponentComponent', () => {
  let component: ShortedRoomsComponentComponent;
  let fixture: ComponentFixture<ShortedRoomsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortedRoomsComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShortedRoomsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
