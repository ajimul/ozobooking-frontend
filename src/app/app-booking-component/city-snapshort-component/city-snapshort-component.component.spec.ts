import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySnapshortComponentComponent } from './city-snapshort-component.component';

describe('CitySnapshotComponentComponent', () => {
  let component: CitySnapshortComponentComponent;
  let fixture: ComponentFixture<CitySnapshortComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitySnapshortComponentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CitySnapshortComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
