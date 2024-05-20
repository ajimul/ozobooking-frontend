import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponentComponent } from "./header-component/header-component.component";
import { SitemapComponent } from "./footer-component/footer-component.component";

@Component({
    selector: 'app-app-booking-component',
    standalone: true,
    templateUrl: './app-booking-component.component.html',
    styleUrl: './app-booking-component.component.css',
    imports: [RouterOutlet, HeaderComponentComponent, SitemapComponent]
})
export class AppBookingComponentComponent {

}
