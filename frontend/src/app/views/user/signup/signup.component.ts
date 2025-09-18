import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {LoginResponseType} from "../../../../types/login-response.type";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";

@Component({
  selector: 'signup-component',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public showPassword: boolean = false;

  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[А-ЯЁ][а-яё]+(?:\s*[А-ЯЁ][а-яё]*)*\s*$/)]],
    email: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+([._%+-][A-Za-z0-9]+)*@([A-Za-z0-9]+(-[A-Za-z0-9]+)*\.)+[A-Za-z]{2,}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-ZА-ЯЁ])(?=.*[a-zа-яё])(?=.*[0-9]).{8,}$/)]],
    agree: [false, Validators.requiredTrue]
  })

  public get name() {
    return this.signupForm.get('name');
  }

  public get email() {
    return this.signupForm.get('email');
  }

  public get password() {
    return this.signupForm.get('password');
  }

  public get agree() {
    return this.signupForm.get('agree');
  }

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private _matSnackBar: MatSnackBar,) {
  }

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
  }

  closePassword(): void {
    this.showPassword = !this.showPassword;
  }

  sendForm(): void {
    if (this.signupForm.invalid) {
      this.name?.markAsDirty();
      this.email?.markAsDirty();
      this.password?.markAsDirty();
      this.agree?.markAsDirty();
    } else if (this.signupForm.valid
      && this.signupForm.value.name
      && this.signupForm.value.email
      && this.signupForm.value.password
      && this.signupForm.value.agree) {
      const signupFormValue = this.signupForm.value;
      const signupSub = this.authService.signup(signupFormValue.name || '', signupFormValue.email || '', signupFormValue.password || '')
        .subscribe({
          next: (data: DefaultResponseType | LoginResponseType) => {
            let errorResponse: DefaultResponseType | null = null;
            let loginResponse: LoginResponseType | null = null;

            if ((data as DefaultResponseType) && (data as DefaultResponseType).error) {
              errorResponse = data as DefaultResponseType;
              if (errorResponse.message) {
                throw new Error(errorResponse.message
                  ? errorResponse.message
                  : 'Ошибка регистрации');
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
              this._matSnackBar.open('Ошибка регистрации', 'Закрыть');
            }
          },
        })
      this.subscription.add(signupSub);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
