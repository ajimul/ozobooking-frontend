import { Component } from '@angular/core';
import { HeroComponentComponent } from "../hero-component/hero-component.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-residence-list-component',
    standalone: true,
    templateUrl: './residence-list-component.component.html',
    styleUrl: './residence-list-component.component.css',
    imports: [HeroComponentComponent]
})
export class ResidenceListComponentComponent {
    constructor(private route: Router){
    }
    selectedResidence(){
        this.route.navigate(['/home/rooms'], { replaceUrl: true });
    }
}
