// angular import
import { CommonModule, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../../Core/models/Login';
import { LoginService } from '../../../Core/service/login/login.service';
import { FormEmailInputComponent } from '../../../theme/shared/widgets/form-email-input/form-email-input.component';
import { FormInputComponent } from '../../../theme/shared/widgets/form-input/form-input.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormInputComponent, FormEmailInputComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  isUser = signal(false)
  isBrowser!: boolean;
  Logininfo!: Login;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
) {
    
}

get f() {
  return this.loginForm.controls;
}

ngOnInit(): void {
  this.loginForm = this.formBuilder.group({
      username: ['sofvaremeet@gmail.com', [Validators.required, Validators.email]],
      password: ['123', [Validators.required]],
  });
}
  onLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
        const loginadmin: Login = this.loginForm.value;
        this.loginService.login(loginadmin).subscribe({
            next: (response: any) => {
                this.router.navigate(['/dashboard']);
            },
            error: (error: any) => {
                this.toastr.error(error.error.message);
            }
        });
    }
    
}

openClassTrade() {
  this.router.navigate(['/clien-login']);
}

  // public method
  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];
}
