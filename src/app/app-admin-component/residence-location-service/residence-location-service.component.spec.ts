import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceLocationServiceComponent } from './residence-location-service.component';

describe('ResidenceLocationServiceComponent', () => {
  let component: ResidenceLocationServiceComponent;
  let fixture: ComponentFixture<ResidenceLocationServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidenceLocationServiceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResidenceLocationServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
