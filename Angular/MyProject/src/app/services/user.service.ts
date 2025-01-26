import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../interface/auth';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DataBaseService } from './data-base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private database: DataBaseService,
    private _http: HttpClient,
    private _authS: AuthService
  ) {}

  // signup
  registerUser(userDetails: User): Observable<any> {
    return this.database.postRequest('user/signup', userDetails).pipe(
      catchError((error) => {
        console.error('Registration failed', error);
        return throwError(error);
      })
    );
  }

  //get all users
  getAllUsers(): Observable<any> {
    return this.database.getRequest('user/').pipe(
      catchError((error) => {
        console.error('Get all users failed', error);
        return throwError(error);
      })
    );
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.database.editRequest('user', id, data).pipe(
      catchError((error) => {
        console.error('edit user failed', error);
        return throwError(error);
      })
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.database.deleteRequest('user', id).pipe(
      catchError((error) => {
        console.error('delete user failed', error);
        return throwError(error);
      })
    );
  }

  // create UserType
  apiURL = 'http://localhost:3000/usertype';
  addUserType(data: any): Observable<any> {
    return this._authS.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this._http.post<any>(this.apiURL, data, { headers });
      }),
      catchError(error => {
        console.error('Error getting token', error);
        return throwError(error);
      })
    );
  }
  // get all userTypes
  getUserTypes(): Observable<any> {
    return this._authS.getAccessToken().pipe(
      switchMap(token => {
        // console.log('header',token)
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this._http.get<any>('http://localhost:3000/userRole', { headers });
      }),
      catchError((error) => {
        console.error('Get all userTypes failed', error);
        return throwError(error);
      })
    );
  }

  // delete userType
  deleteUserType(id: string): Observable<any> {
    return this.database.deleteRequest('userRole', id).pipe(
      catchError((error) => {
        console.error('delete userType failed', error);
        return throwError(error);
      })
    );
  }

  // edit userType
  updateUserType(id: string, data: any): Observable<any> {
    return this.database.editRequest('userRole', id, data).pipe(
      catchError((error) => {
        console.error('edit userType failed', error);
        return throwError(error);
      })
    );
  }
}
