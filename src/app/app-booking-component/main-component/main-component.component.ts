import { Component } from '@angular/core';
import { HeroComponentComponent } from "../hero-component/hero-component.component";

@Component({
    selector: 'app-main-component',
    standalone: true,
    templateUrl: './main-component.component.html',
    styleUrl: './main-component.component.css',
    imports: [HeroComponentComponent]
})
export class MainComponentComponent {

}
