import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { TokenService } from '../token-service/token.service';
import { environment } from '../../environments/environment';
import { User } from '../app-interface/PartnerRegisterDTO';
import { ResidencceAmentities, ResidencceRoomAmentities, Residence, ResidenceImage, ResidenceRoomsImages } from '../app-interface/Residence';

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
  getResidencesById(id: number): Observable<Residence> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.get<Residence>(
      `${this.apiServerUrl}v1/manager/residence/${id}`,
      options
    );
  }



  //----------------------------------------------Residence Images Service API (Admin)------------------------------------------------------>
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
  deleteResidenceImageById(id: number, fileName: string): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.delete(`${this.apiServerUrl}v1/manager/residences/image/${id}/${fileName}`, options)

  }
  //----------------------------------------------Residence Amentities Service API (Manager)------------------------------------------------------>
  addUpdateResidenceAmentities(payload: ResidencceAmentities): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.post<any>(`${this.apiServerUrl}v1/manager/residence/amentities`, payload, options)
  }
  deleteResidenceAmentitiesById(id: number): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.delete(`${this.apiServerUrl}v1/manager/residence/amentities/${id}`, options)

  }
  //----------------------------------------------Residence Room Amentities Service API (Manager)------------------------------------------------------>

  addUpdateResidenceRoomAmentities(payload: ResidencceRoomAmentities): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };

    return this.http.post<any>(`${this.apiServerUrl}v1/manager/residence/room/amentities`, payload, options)
  }

  deleteResidenceRoomAmentitiesById(id: number): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.delete(`${this.apiServerUrl}v1/manager/residence/room/amentities/${id}`, options)

  }
  //----------------------------------------------Residence Room Images Service API (Manager)------------------------------------------------------>
  getRoomImagesByRoomId(roomId: number): Observable<ResidenceRoomsImages[]> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.get<ResidenceImage[]>(`${this.apiServerUrl}v1/manager/residences/room/image/${roomId}`, options);
  }

  uploadResidenceRoomImages(imagResidenceRoom_refId: number, files: File[]): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    const formData: FormData = new FormData();
    formData.append('imagResidenceRoom_refId', imagResidenceRoom_refId.toString());
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return this.http.post<any>(`${this.apiServerUrl}v1/manager/residences/room/image/upload`, formData, options)
  }
  deleteResidenceRoomImageById(id: number, fileName: string): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.delete(`${this.apiServerUrl}v1/manager/residences/room/image/${id}/${fileName}`, options)

  }


  //----------------------------------------------Residence Service API (Public)------------------------------------------------------>

  getAllResidenceImages(): Observable<ResidenceImage[]> {
    return this.http.get<ResidenceImage[]>(`${this.apiServerUrl}v1/public/`);
  }


}
