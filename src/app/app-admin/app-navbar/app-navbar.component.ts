import { ChangeDetectorRef, Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ApiService } from '../../api-service/api-service.service';
import { UserService } from '../../user-service/user.service';
import { TokenService } from '../../token-service/token.service';
import { CustomValidationService } from '../../app-validator/custom-validation-service';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app-navbar.component.html',
  styleUrl: './app-navbar.component.css',
})
export class AppNavbarComponent {
  constructor(
    private apiService: ApiService,
    private route: Router,
    private user: UserService,
    private token: TokenService,
    private validationService: CustomValidationService,
    private fb: FormBuilder,
    private authService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  isLoggedIn: boolean = false;
  isMenuOpen: boolean = true;
  toggleLogin() {
    this.apiService.logout().subscribe({
      next: (value) => {
        this.user.removeCurrentUser();
        localStorage.removeItem('ozo_access_token');
        this.isLoggedIn = false;
        alert('Logout is successful Thanks Again!');
      },
      error: (error) => {
          alert('Logout Faield!');
      },
      complete: () => {},
    });
  }

  isLogin() {
    this.authService.currentUser$
      .pipe(
        map((user) => {
          if (!user) {
            this.isLoggedIn = true;
            this.route.navigateByUrl('login');
            return false;
          }
          this.isLoggedIn = true;
          return true;
        })
      )
      .subscribe();
  }
  menue() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  home() {
    this.route.navigate(['admin-nav'], { replaceUrl: true });
  }
  addPartner() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngAfterViewInit(): void {
    this.isLogin();
    this.cd.detectChanges();
  }
}
