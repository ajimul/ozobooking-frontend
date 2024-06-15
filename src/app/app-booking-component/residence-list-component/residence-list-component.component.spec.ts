import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceListComponentComponent } from './residence-list-component.component';

describe('ResidenceListComponentComponent', () => {
  let component: ResidenceListComponentComponent;
  let fixture: ComponentFixture<ResidenceListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidenceListComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResidenceListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
