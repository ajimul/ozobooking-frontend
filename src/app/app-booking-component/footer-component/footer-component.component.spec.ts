import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapComponent } from './footer-component.component';

describe('SitemapComponent', () => {
  let component: SitemapComponent;
  let fixture: ComponentFixture<SitemapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SitemapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SitemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
