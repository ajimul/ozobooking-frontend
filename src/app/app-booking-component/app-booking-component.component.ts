import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponentComponent } from "./header-component/header-component.component";
import { SitemapComponent } from "./footer-component/footer-component.component";
import { DefaultPageComponentComponent } from "./default-page-component/default-page-component.component";

@Component({
    selector: 'app-app-booking-component',
    standalone: true,
    templateUrl: './app-booking-component.component.html',
    styleUrl: './app-booking-component.component.css',
    imports: [RouterOutlet, HeaderComponentComponent, SitemapComponent, DefaultPageComponentComponent]
})
export class AppBookingComponentComponent {
    constructor(private route: Router) {
        // this.route.navigate(['/home']);
    }
}
