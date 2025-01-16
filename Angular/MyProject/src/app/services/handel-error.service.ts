import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandelErrorService {
  logErrorResponse(logErrorResponse: any): import("rxjs").OperatorFunction<import("@angular/common/http").HttpEvent<any>, import("@angular/common/http").HttpEvent<any>> {
      throw new Error("Method not implemented.");
  }


  // Handling Errors !! 
  private handelError(errorResponse : HttpErrorResponse): Observable<any>{
    // Client side Errors 
 if(errorResponse.status === 0){
   console.log(`Clinet side Error Occurred ${errorResponse.status} - ${errorResponse.error}`)
 }else{
     // Backend side Errors
   console.log(`BackEnd side Error Occurred ${errorResponse.status} - ${errorResponse.error}`)
 }
return throwError(()=>new Error('Somthing Bad happened please Try Again'))
 }


}
