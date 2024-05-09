import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { TokenService } from '../token-service/token.service';
import { environment } from '../../environments/environment';
import { User } from '../app-interface/PartnerRegisterDTO';
import { Distance, ResidenceAmenities, ResidenceRoomAmenities, Residence, ResidenceImage, ResidenceRooms, ResidenceRoomsImages, ResidenceRoomsPolicy } from '../app-interface/Residence';

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
  //----------------------------------------------Residence Location Service API (Manager)------------------------------------------------------>
  addUpdateResidenceDistance(payload: Distance): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.post<any>(`${this.apiServerUrl}v1/manager/residences/location/add`, payload, options)
  }
  deleteResidenceDistanceById(distanceId: number): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.delete(`${this.apiServerUrl}v1/manager/residences/location/${distanceId}`, options)

  }
  //----------------------------------------------Residence Room Service API (Manager)------------------------------------------------------>
  addUpdateResidenceRoom(payload: ResidenceRooms): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.post<any>(`${this.apiServerUrl}v1/manager/residences/room/add`, payload, options)
  }
  deleteResidenceRoomById(roomId: number): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.delete(`${this.apiServerUrl}v1/manager/residences/room/${roomId}`, options)

  }
  //----------------------------------------------Residence Amenities Service API (Manager)------------------------------------------------------>
  addUpdateResidenceAmenities(payload: ResidenceAmenities): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.post<any>(`${this.apiServerUrl}v1/manager/residence/amenities`, payload, options)
  }
  deleteResidenceAmenitiesById(id: number): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.delete(`${this.apiServerUrl}v1/manager/residence/amenities/${id}`, options)

  }
  //----------------------------------------------Residence Room Amenities Service API (Manager)------------------------------------------------------>

  addUpdateResidenceRoomAmenities(payload: ResidenceRoomAmenities): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };

    return this.http.post<any>(`${this.apiServerUrl}v1/manager/residence/room/amenities`, payload, options)
  }

  deleteResidenceRoomAmenitiesById(id: number): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.delete(`${this.apiServerUrl}v1/manager/residence/room/amenities/${id}`, options)

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


  //----------------------------------------------Residence Room Policy Service API (Public)------------------------------------------------------>
  addUpdateResidenceRoomPolicy(residenceRoomsPolicy: ResidenceRoomsPolicy): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.post<any>(`${this.apiServerUrl}v1/manager/residences/room/policy`, residenceRoomsPolicy, options)

  }
  getRoomPolicyByRoomId(roomId: number): Observable<ResidenceRoomsPolicy[]> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.get<ResidenceRoomsPolicy[]>(`${this.apiServerUrl}v1/manager/residences/room/policy/${roomId}`, options);
  }

  deleteResidenceRoomsPolicyDetailsById(roomPolicyDetailsId: number,): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.delete(`${this.apiServerUrl}v1/manager/residences/room/policy/details/${roomPolicyDetailsId}`, options)

  }
  deleteResidenceRoomsPolicyById(roomPolicyId: number,): Observable<any> {
    const options = {
      headers: this.token.getContentLessHeadersWithAuthorization(),
    };
    return this.http.delete(`${this.apiServerUrl}v1/manager/residences/room/policy/${roomPolicyId}`, options)

  }




  //----------------------------------------------Residence Service API (Public)------------------------------------------------------>

  getAllResidenceImages(): Observable<ResidenceImage[]> {
    return this.http.get<ResidenceImage[]>(`${this.apiServerUrl}v1/public/`);
  }


}
