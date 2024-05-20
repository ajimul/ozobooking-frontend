import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { ApiService } from '../../api-service/api-service.service';
import { UserService } from '../../user-service/user.service';
import { TokenService } from '../../token-service/token.service';
import { CustomValidationService } from '../../app-validator/custom-validation-service';
import { FormBuilder } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { take, tap } from 'rxjs';
import { ClientLoginComponentComponent } from '../client-login-component/client-login-component.component';
@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.css'
})
export class HeaderComponentComponent{



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
  
  isLoggedIn: boolean = false;
  isMenuOpen: boolean = true;

  loginLogout() {
    this.authService.currentUser$
      .pipe(
        take(1), // Ensures the observable completes after emitting the first value
        tap((user) => {
          if (user) {
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
          } else {
            this.logoutFlag = false;
            this.openLoginDialog();
          }
        })
      )
      .subscribe();
  }

  openLoginDialog() {
    const config = new MatDialogConfig();
    config.width = '40%';
    config.height = '90%';
    const dialogRef = this.dialog.open(ClientLoginComponentComponent, config);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.success) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  menue() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  home() {
    this.route.navigate(['/'], { replaceUrl: true });
  }
  addPartner() {
    this.isMenuOpen = !this.isMenuOpen;
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
