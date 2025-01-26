import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../customvalidators/password.validators';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { response } from 'express';

@Component({
  selector: 'app-signup',
  standalone: false,

  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private authService: AuthService,
    private router: Router,
    private UserService: UserService
  ) {}
  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z]+( ?: [a-zA-Z]+)*$/),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        retypepassword: ['', Validators.required],
        userType: 'user',
      },
      {
        Validators: passwordValidator,
      }
    );
  }

  get name() {
    return this.signupForm.controls['name'];
  }
  get email() {
    return this.signupForm.controls['email'];
  }
  get password() {
    return this.signupForm.controls['password'];
  }
  get retypepassword() {
    return this.signupForm.controls['retypepassword'];
  }

  submit() {
    const postData = { ...this.signupForm.value };
    delete postData.retypepassword; // delete retypepassword from postData

    postData.userType = '677f9b528515a6d75519cd7c'; // user

    this.UserService.registerUser(postData).subscribe({
      next: (response) => {
        localStorage.setItem('userType', response.userType);
        if (response.userType === 'admin') {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['user-dashboard']);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
