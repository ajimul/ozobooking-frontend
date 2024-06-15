import { Component } from '@angular/core';
import { HeroComponentComponent } from "../hero-component/hero-component.component";

@Component({
    selector: 'app-residence-rooms-component',
    standalone: true,
    templateUrl: './residence-rooms-component.component.html',
    styleUrl: './residence-rooms-component.component.css',
    imports: [HeroComponentComponent]
})
export class ResidenceRoomsComponentComponent {

}
