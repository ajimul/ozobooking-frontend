import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getCustomContentHeadersWithAuthorization(): HttpHeaders {
    const token = localStorage.getItem('ozo_access_token');
    return new HttpHeaders({
      'Content-Type': 'file', //if use only file,need to be spacify Content-Type
      Authorization: token ? `Bearer ${token}` : '',
    });
  }
  getContentHeadersWithAuthorization(): HttpHeaders {
    const token = localStorage.getItem('ozo_access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json', // Adjust Content-Type as needed
      Authorization: token ? `Bearer ${token}` : '',
    });
  }
  getContentLessHeadersWithAuthorization(): HttpHeaders {
    const token = localStorage.getItem('ozo_access_token');
    return new HttpHeaders({
      // 'Content-Type': 'file', //while combination file with other object spring jwt not support for Content-Type
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  setAccessToken(token: string): void {
    localStorage.setItem('ozo_access_token', token);
  }
  setRefreshToken(token: string): void {
    localStorage.setItem('ozo_refresh_token', token);
  }

  clearAccessToken(): void {
    localStorage.removeItem('ozo_access_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('ozo_access_token');
  }
}
