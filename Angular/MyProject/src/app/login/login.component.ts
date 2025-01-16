import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '../interface/loginResponse';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // إعداد الفورم
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  // دالة تسجيل الدخول
  login() {
    if (this.loginForm.invalid) {
      console.log('Please fill in valid credentials');
      return;
    }

    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: (res: LoginResponse) => {
        console.log('Login successful:', res);
        localStorage.setItem('user', JSON.stringify(res.user)); 
        this.router.navigate(['/home']); 
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid email or password');
      },
    });
  }
  // ngOnInit(): void {
  //   this.loginForm = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
  //   });
  // }

  // login() {
  //   if (this.loginForm.valid) {
  //     this.loading = true;
  //     this._auths.login(this.loginForm.value).subscribe({
  //       next: () => {
  //         this.loading = false;

  //         const userType = localStorage.getItem('userType');

  //         if (userType === 'Admin') {
  //           this._router.navigate(["/dashboard"]);
  //         } else {
  //           this._router.navigate(["/user-dashboard"]);
  //         }
  //       },
  //       error: (err: { message: any; }) => {
  //         this.loading = false;
  //         console.log(err.message);
  //       }
  //     });
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }
}
