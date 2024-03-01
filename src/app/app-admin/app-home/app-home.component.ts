import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../user-service/user.service';
import { ApiService } from '../../api-service/api-service.service';
import { LoginComponent } from "../login/login.component";
@Component({
    selector: 'app-app-home',
    standalone: true,
    templateUrl: './app-home.component.html',
    styleUrl: './app-home.component.css',
    imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive, LoginComponent]
})
export class AppHomeComponent implements OnInit {
  sidebar: boolean = false;
  constructor(private service: ApiService, private route: Router,private user:UserService) {}

  ngOnInit(): void {}
  // responsedata: any;
  // groups: ItineraryListSimpleDTO[] = [];
  logout() {
    this.service.logout().subscribe({
      next: (value) => {  // Use arrow function here
        this.user.removeCurrentUser();
        localStorage.removeItem('ozo_access_token');
        this.route.navigate([''], { replaceUrl: true });
      },
      error: (err) => {
        // Handle error
      },
      complete: () => {
        // Handle completion
      },
    });
   
  }
  sidebar_Open_Closer() {
    if (this.sidebar) {
      this.sidebar = false;
    } else {
      this.sidebar = true;
    }
  }
  menue_click() {
    this.sidebar = false;
  }
}
