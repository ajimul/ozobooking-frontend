import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerLoginComponentComponent } from './partner-login-component.component';

describe('PartnerLoginComponentComponent', () => {
  let component: PartnerLoginComponentComponent;
  let fixture: ComponentFixture<PartnerLoginComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerLoginComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnerLoginComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
