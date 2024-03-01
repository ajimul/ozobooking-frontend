import {  HttpClient,  HttpHeaders,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TokenService } from '../token-service/token.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiServerUrl = environment.apiBaseUrl;
  h: HttpHeaders = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private token:TokenService) {}
    // const options = { headers: this.token.getContentHeadersWithAuthorization() };

  //----------------------------------------------LOGIN SERVICE------------------------------------------------------>
  loginn(loginForm: any) {
    return this.http.post(
      `${this.apiServerUrl}v1/auth/authenticate`,
      loginForm
    );
  }
  logout(): Observable<string> {
    const logoutUrl = `${this.apiServerUrl}v1/auth/logout`;
    return this.http.post<string>(logoutUrl, null);
  }
}
