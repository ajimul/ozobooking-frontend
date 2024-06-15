import { Component } from '@angular/core';
import { Router,RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CarouselComponent } from "../../carousel/carousel.component";
import { CommonModule } from '@angular/common';
import { DuplicateDirective } from '../../carousel/duplicate.directive';
import { ResidenceCarouselComponentComponent } from '../residence-carousel-component/residence-carousel-component.component';

@Component({
    selector: 'app-city-snapshort-component',
    standalone: true,
    templateUrl: './city-snapshort-component.component.html',
    styleUrl: './city-snapshort-component.component.css',
    imports: [RouterOutlet, RouterLink, RouterLinkActive,CommonModule,RouterLinkActive,RouterLink, CarouselComponent, CommonModule, DuplicateDirective, ResidenceCarouselComponentComponent]
})
export class CitySnapshortComponentComponent {
  constructor(private route: Router){

  }
  items = [{ img: 'https://picsum.photos/200/200?random=1' },
  { img: 'https://picsum.photos/200/200?random=2' },
  { img: 'https://picsum.photos/200/200?random=3' },
  { img: 'https://picsum.photos/200/200?random=4' },
  { img: 'https://picsum.photos/200/200?random=5' },
  { img: 'https://picsum.photos/200/200?random=6' },
  { img: 'https://picsum.photos/200/200?random=7' },
  { img: 'https://picsum.photos/200/200?random=8' }
  ];

  selectedCity() {
    this.route.navigate(['/home/testx'], { replaceUrl: true });
  }
}
