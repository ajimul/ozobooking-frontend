import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { TokenService } from '../token-service/token.service';
import { environment } from '../../environments/environment';
import { User } from '../app-interface/PartnerRegisterDTO';
import { Residence } from '../app-interface/Residence';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private token: TokenService) { }

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

  updateResidences(residence: any): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.put<any>(
      `${this.apiServerUrl}v1/admin/residences/update`, residence, options);
  }
  getResidences(): Observable<Residence[]> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.get<Residence[]>(
      `${this.apiServerUrl}v1/admin/residences`,
      options
    );
  }
  deleteResidence(rid: number): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.delete<any>(`${this.apiServerUrl}v1/admin/residences/${rid}`, options);
  }

  uploadResidenceImages(residenceImagesRefId: number, files: File[]): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    const formData: FormData = new FormData();
    formData.append('residenceImagesRefId', residenceImagesRefId.toString());
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return this.http.post<any>(`${this.apiServerUrl}v1/manager/residences/image/upload`, formData, options)
  }
}
