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
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  ngOnInit() {
    // تأكد من أن المستخدم لا يكون قد سجل الدخول بالفعل
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    if (this.loginForm.invalid) {
      console.log('Please fill in valid credentials');
      return;
    }

    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: (res: LoginResponse) => {
        if (res.accessToken) {
          console.log('Login successful:', res);
          localStorage.setItem('user', JSON.stringify(res.user)); 
          localStorage.setItem('accessToken', res.accessToken); // تخزين التوكن في الـ localStorage
    
          // تحقق من الدور
          if (res.userType === 'Admin') {
            // إذا كان المستخدم "أدمن"، توجهه إلى لوحة التحكم
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid email or password');
      }
    });
}}
