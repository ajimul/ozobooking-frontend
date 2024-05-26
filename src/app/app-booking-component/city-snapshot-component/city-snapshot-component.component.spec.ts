import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySnapshotComponentComponent } from './city-snapshot-component.component';

describe('CitySnapshotComponentComponent', () => {
  let component: CitySnapshotComponentComponent;
  let fixture: ComponentFixture<CitySnapshotComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitySnapshotComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitySnapshotComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
