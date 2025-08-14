import { Injectable } from '@angular/core';
import {Observable, Subject, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginResponseType} from "../../../types/login-response.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_ID_KEY} from "../../../constants/auth-tokens.constants";
import {TokensType} from "../../../types/tokens.type";
import {UserInfoType} from "../../../types/user-info.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged$: Subject<boolean> = new Subject<boolean>();
  private isLogged: boolean = false;

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  public getIsLogged(): boolean {
    return this.isLogged;
  }

  public setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    this.isLogged = true;
    this.isLogged$.next(true);
  }

  public getTokens(): TokensType {
    return {
      accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
      refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
    };
  }

  public removeTokens() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    this.isLogged = false;
    this.isLogged$.next(false);
  }

  public set setUserInfo(userId: string | null) {
    if (userId) {
      localStorage.setItem(USER_ID_KEY, userId);
    } else {
      localStorage.removeItem(USER_ID_KEY);
    }
  }

  public login(email: string, password: string, rememberMe: boolean): Observable<DefaultResponseType | LoginResponseType> {
    return this.http.post<DefaultResponseType | LoginResponseType>(`${environment.api}login`, {email, password, rememberMe});
  }

  public signup(name: string, email: string, password: string): Observable<DefaultResponseType | LoginResponseType> {
    return this.http.post<DefaultResponseType | LoginResponseType>(`${environment.api}signup`, {name, email, password});
  }

  public refresh(): Observable<DefaultResponseType | LoginResponseType> {
    const tokens: TokensType = this.getTokens();
    if (tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType | LoginResponseType>(`${environment.api}refresh`,
        {refreshToken: tokens.refreshToken});
    }
    throw throwError(()=> 'Token is not found');
  }

  public getUserInfo(): Observable<DefaultResponseType | UserInfoType> {
    return this.http.get<DefaultResponseType | UserInfoType>(`${environment.api}users`);
  }

  public logout(refreshToken: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(`${environment.api}logout`, {refreshToken});
  }
}
