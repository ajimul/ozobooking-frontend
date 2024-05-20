import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceListViewComponent } from './residence-list-view.component';

describe('ResidenceListViewComponent', () => {
  let component: ResidenceListViewComponent;
  let fixture: ComponentFixture<ResidenceListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidenceListViewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResidenceListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
