import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HandelErrorService } from './handel-error.service';
import { LoginResponse } from '../interface/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  post(arg0: string): string {
    throw new Error('Method not implemented.');
  }

  http= inject(HttpClient);
  handelErrorService = inject(HandelErrorService)
  handelError: any;

  getRequest<T>(name:string):Observable<T>{
    return this.http.get<T>(`http://localhost:3000/${name}`)
    // .pipe(
    // catchError(this.handelError.logErrorResoponse)
  // );
  }

  postRequest<T>(name:string,data:any):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`http://localhost:3000/${name}`,data)
  }

  deleteRequest<T>(name:string,id:any):Observable<LoginResponse>{
    return this.http.delete<LoginResponse>(`http://localhost:3000/${name}/${id}`)
  }

  editRequest<T>(name:string,id:any,data:any):Observable<LoginResponse>{
    return this.http.put<LoginResponse>(`http://localhost:3000/${name}/${id}`,data)
  }

}