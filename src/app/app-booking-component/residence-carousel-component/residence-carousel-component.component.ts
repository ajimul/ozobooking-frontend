import { Component } from '@angular/core';
import { CarouselComponent } from "../../carousel/carousel.component";
import { CommonModule } from '@angular/common';
import { DuplicateDirective } from '../../carousel/duplicate.directive';

@Component({
    selector: 'app-residence-carousel-component',
    standalone: true,
    templateUrl: './residence-carousel-component.component.html',
    styleUrl: './residence-carousel-component.component.css',
    imports: [CarouselComponent, CommonModule,CarouselComponent,DuplicateDirective]
})
export class ResidenceCarouselComponentComponent {
    items = [
        { img: 'https://picsum.photos/300/300?random=1' },
        { img: 'https://picsum.photos/300/300?random=2' },
        { img: 'https://picsum.photos/300/300?random=3' },
        { img: 'https://picsum.photos/300/300?random=4' },
        { img: 'https://picsum.photos/300/300?random=5' },
        { img: 'https://picsum.photos/300/300?random=6' },
        { img: 'https://picsum.photos/300/300?random=7' },
        { img: 'https://picsum.photos/300/300?random=8' }
    ];
}
