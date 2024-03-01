import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class guardGuard implements CanActivate {
  constructor( private route: Router,private authService: UserService) { }
  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map((user) => {
        if (!user) {
          
          this.route.navigateByUrl('login');
          return false;
        }
        return true;
      })
    );
  }
  //  generateRandomString(): string {
  //   // Implement your logic to generate a random string here
  //   // Example implementation:
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   const length = 10;
  //   let result = '';
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * characters.length));
  //   }
  //   return result;
  // }
}