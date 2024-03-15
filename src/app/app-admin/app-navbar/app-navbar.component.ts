import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-navbar',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app-navbar.component.html',
  styleUrl: './app-navbar.component.css',
})
export class AppNavbarComponent {
  menue() {
    console.log('Hello Ajay');
  }
}
