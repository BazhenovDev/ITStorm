import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {LoginResponseType} from "../../../../types/login-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showPassword: boolean = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  public get email() {
    return this.loginForm.get('email');
  }

  public get password() {
    return this.loginForm.get('password');
  }

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private _matSnackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
  }

  sendForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }

    const loginFormValue = this.loginForm.value;
    if (loginFormValue && loginFormValue.email && loginFormValue.password) {
      this.authService.login(loginFormValue.email, loginFormValue.password, !!loginFormValue.rememberMe)
        .subscribe({
          next: (data: DefaultResponseType | LoginResponseType) => {

            let errorResponse: DefaultResponseType | null = null;
            let loginResponse: LoginResponseType | null = null;

            if ((data as DefaultResponseType) && (data as DefaultResponseType).error) {
              errorResponse = data as DefaultResponseType;
              if (errorResponse.message) {
                throw new Error(errorResponse.message
                  ? errorResponse.message
                  : 'Ошибка авторизации');
              }
            }

            if ((data as LoginResponseType)
              && (data as LoginResponseType).accessToken
              && (data as LoginResponseType).refreshToken
              && (data as LoginResponseType).userId) {
              loginResponse = data as LoginResponseType;
              this.authService.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
              this.authService.setUserInfo = loginResponse.userId;
              this.router.navigate(['/']);
            }

          },
          error: (error: HttpErrorResponse) => {
            if (error.error && error.error.message) {
              this._matSnackBar.open(error.error.message, 'Закрыть');
            } else {
              this._matSnackBar.open('Ошибка авторизации', 'Закрыть');
            }
          }
        })
    }
  }

  closePassword() {
    this.showPassword = !this.showPassword;
  }
}
