import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceImageServiceComponent } from './residence-image-service.component';

describe('ResidenceImageServiceComponent', () => {
  let component: ResidenceImageServiceComponent;
  let fixture: ComponentFixture<ResidenceImageServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidenceImageServiceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResidenceImageServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
