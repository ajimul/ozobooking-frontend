import { Component } from '@angular/core';
import { HeroComponentComponent } from "../hero-component/hero-component.component";
import { Router } from '@angular/router';
import { TestComponent } from "../../test/test.component";
import { CommonModule } from '@angular/common';
import { CitySnapshortComponentComponent } from "../city-snapshort-component/city-snapshort-component.component";
import { ShortedRoomsComponentComponent } from "../shorted-rooms-component/shorted-rooms-component.component";

@Component({
    selector: 'app-default-page-component',
    standalone: true,
    templateUrl: './default-page-component.component.html',
    styleUrl: './default-page-component.component.css',
    imports: [HeroComponentComponent, TestComponent, CommonModule, CitySnapshortComponentComponent, ShortedRoomsComponentComponent]
})
export class DefaultPageComponentComponent {
    constructor(private route: Router) {
    }
    gotoTest() {
        this.route.navigate(['home/test']);
    }
}
