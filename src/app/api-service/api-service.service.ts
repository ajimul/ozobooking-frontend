import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TokenService } from '../token-service/token.service';
import { environment } from '../../environments/environment';
import { User } from '../app-interface/PartnerRegisterDTO';
import { Residence } from '../app-interface/Residence';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private token: TokenService) {}

  //----------------------------------------------LOGIN SERVICE------------------------------------------------------>
  loginn(loginForm: any) {
    return this.http.post(
      `${this.apiServerUrl}v1/auth/authenticate`,
      loginForm
    );
  }
  logout(): Observable<string> {
    const options = {
      headers: this.token.getContentHeadersWithAuthorization(),
    };

    const logoutUrl = `${this.apiServerUrl}v1/auth/logout`;
    return this.http.post<string>(logoutUrl, null, options);
  }
  //----------------------------------------------ADD PARTNER(Admin)------------------------------------------------------>
  addPartner(user: User): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.post<any>(
      `${this.apiServerUrl}v1/admin/register`,
      user,
      options
    );
  }
  //----------------------------------------------Residence Service API (Admin)------------------------------------------------------>

  getResidences(): Observable<Residence[]> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.get<Residence[]>(
      `${this.apiServerUrl}v1/admin/residences`,
      options
    );
  }
}
