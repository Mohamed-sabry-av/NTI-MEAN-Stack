import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { DataBaseService } from './data-base.service';
import { User } from '../interface/auth';
import { LoginResponse } from '../interface/loginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;
  database = inject(DataBaseService);

  constructor() {
    const storedToken = localStorage.getItem('accessToken');
    this.tokenSubject = new BehaviorSubject<string | null>(storedToken);
  }

  login(loginData: any): Observable<LoginResponse> {
    return this.database.postRequest('user/login', loginData).pipe(
      tap((res: LoginResponse) => {
        const token = res.accessToken;
        const userId = res.userId;
        const userType = res.userType;
        const roleName = res.roleName;
        if (token) {
          localStorage.setItem('accessToken', token);
          localStorage.setItem('userId', userId);
          localStorage.setItem('userType', userType);
          localStorage.setItem('roleName', roleName || ''); // تأكد من تخزين الـ roleName
          this.tokenSubject.next(token);
          console.log('Access Token:', token);
          console.log('UserID:', userId);
          console.log('Userrole:', userType);
        }
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(error); // إرجاع الخطأ إذا حدث
      })
    );
  }

  // تسجيل الخروج
  logout() {
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
  // دالة الحصول على الـ token
  getAccessToken(): Observable<string | null> {
    const token = localStorage.getItem('accessToken');
    return of(token ?? null); // بدلاً من returning ''
  }
  
}
