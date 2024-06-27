import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceViewsComponentComponent } from './residence-views-component.component';

describe('ResidenceViewsComponentComponent', () => {
  let component: ResidenceViewsComponentComponent;
  let fixture: ComponentFixture<ResidenceViewsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidenceViewsComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResidenceViewsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
