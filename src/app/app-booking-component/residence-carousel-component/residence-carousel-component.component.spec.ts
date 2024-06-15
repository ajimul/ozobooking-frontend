import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceCarouselComponentComponent } from './residence-carousel-component.component';

describe('ResidenceCarouselComponentComponent', () => {
  let component: ResidenceCarouselComponentComponent;
  let fixture: ComponentFixture<ResidenceCarouselComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidenceCarouselComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResidenceCarouselComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
