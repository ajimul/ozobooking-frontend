import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLoginComponentComponent } from './client-login-component.component';

describe('ClientLoginComponentComponent', () => {
  let component: ClientLoginComponentComponent;
  let fixture: ComponentFixture<ClientLoginComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientLoginComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientLoginComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
