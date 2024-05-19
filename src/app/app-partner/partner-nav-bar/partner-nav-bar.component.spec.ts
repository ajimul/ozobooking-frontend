import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerNavBarComponent } from './partner-nav-bar.component';

describe('PartnerNavBarComponent', () => {
  let component: PartnerNavBarComponent;
  let fixture: ComponentFixture<PartnerNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnerNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
