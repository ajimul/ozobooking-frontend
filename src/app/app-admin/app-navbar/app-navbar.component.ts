import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
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
import { map, take, tap } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppLoginComponent } from '../app-login/app-login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './app-navbar.component.html',
  styleUrl: './app-navbar.component.css',
})
export class AppNavbarComponent {
  constructor(private dialog: MatDialog,
    private apiService: ApiService,
    private route: Router,
    private user: UserService,
    private token: TokenService,
    private validationService: CustomValidationService,
    private fb: FormBuilder,
    private authService: UserService,
    private cd: ChangeDetectorRef
  ) { }

  isLoggedIn: boolean = false;
  isMenuOpen: boolean = true;
  loginLogout() {
    if (confirm(this.logoutConfirmationMessage)) {
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
        complete: () => { },
      });
      this.logoutFlag = false;
    } else {
      this.logoutFlag = false;
    }
  }

  isLogin() {
    this.authService.currentUser$
      .pipe(
        map((user) => {
          if (!user) {
            this.isLoggedIn = false;
            this.route.navigateByUrl('');
          }
          this.isLoggedIn = true;
        })
      )
      .subscribe();
  }

  logoutFlag = false;
  logoutConfirmationMessage = "Are you sure you want to log out?";

  confirmLogoutAction() {
    if (confirm(this.logoutConfirmationMessage)) {
      this.logoutFlag = false;
    } else {
      this.logoutFlag = false;
    }
  }

  confirmLogout() {
    this.logoutFlag = true;

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
  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const childElement1 = document.getElementById('aside-open-closer-action');
    if (childElement1 && !this.isDescendant(childElement1, target)) {
      this.isMenuOpen = false;
    }
  }
  isDescendant(parent: HTMLElement, child: HTMLElement): boolean {
    let node = child.parentNode;
    while (node != null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

}
