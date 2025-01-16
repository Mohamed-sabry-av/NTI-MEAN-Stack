import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { DataBaseService } from './data-base.service';
import { User} from '../interface/auth';
import { LoginResponse} from '../interface/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // login(value: any) {
  //   throw new Error('Method not implemented.');
  // }

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  database= inject(DataBaseService)



  constructor(private http: HttpClient){}

  registerUser(userDetails: User): Observable<any> {
    return this.database.postRequest('user/signup', userDetails) 
      .pipe(
        catchError((error) => {
          console.error('Registration failed', error);
          return throwError(error);  
        })
      );
  }

  login(loginData: any): Observable<LoginResponse> {
    return this.database.postRequest('user/login', loginData).pipe(
      tap((res: LoginResponse) => {
        const token = res.accessToken;
        if (token) {
          localStorage.setItem('accessToken', token);
          this.tokenSubject.next(token);
          console.log('Access Token:', token);
        }
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(error);  // إرجاع الخطأ إذا حدث
      })
    );
  }


  // دالة الحصول على الـ token
  getAccessToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }
  
  // تسجيل الدخول
  // login(loginData: any): Observable<any> {
  //   return this._http.post<any>(this.database, loginData).pipe(
  //     tap(res => {
  //       const token = res.accessToken;
  //       if (token) {
  //         localStorage.setItem('accessToken', token);
  //         this.tokenSubject.next(token);
  
  //         // Decode the JWT to retrieve userType
  //         const decodedToken = jwtDecode<any>(token);
  //         if (decodedToken.userType) { // Check if userType exists
  //           const userType = decodedToken.userType;
  //           localStorage.setItem('userType', userType);
  //         } else {
  //           console.warn('userType not found in token');
  //         }
  //       }
  //     })
  //   );
  // }

  // login(email:string, password:string):Observable<any>{
  //   this.database.('login',)
  // }


  // // استرجاع الـ Access Token
  // getAccessToken(): Observable<string | null> {
  //   return this.tokenSubject.asObservable();
  // }

  // تسجيل الخروج
   logout(){
this.tokenSubject.next(null);
localStorage.removeItem('accessToken');
  }

  // التحقق إذا كان المستخدم مسجل دخوله
  isAuthenticated(): boolean {
    return this.tokenSubject.value !== null;
  }

  // فك تشفير الـ JWT
  decodeAccessToken() {
    const token = this.tokenSubject.value;
    if (token) {
      return jwtDecode<any>(token);
    }
    return null;
  }
}