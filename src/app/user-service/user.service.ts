import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
platformId: Object;
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }
  currentUser$ = new BehaviorSubject<{ id: string; name: string } | null | undefined >(undefined);
  initializeCurrentUser() {


    if (isPlatformBrowser(this.platformId) && localStorage.getItem('ozo_access_token')) {
      this.currentUser$.next({ id: '1', name: 'Foo' });
      // this.currentUser$.subscribe(user => {
      //   console.log('Current User ID:', user?.id);
      //   console.log('Current User Name:', user?.name);
      // });
    } else {
      this.currentUser$.next(null);
    }

  }
  removeCurrentUser() {
    this.currentUser$.next(null);
  }
}
