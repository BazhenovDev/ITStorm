import {Component, HostListener, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {UserInfoType} from "../../../../types/user-info.type";
import {TokensType} from "../../../../types/tokens.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;
  showMenu: boolean = false;
  @Input() userInfo: UserInfoType | null = null;

  constructor(private authService: AuthService,
              private _matSnackBar: MatSnackBar,
              private router: Router,) { }

  ngOnInit(): void {
    this.isLogged = this.authService.getIsLogged();
    this.authService.isLogged$
    .subscribe(isLogged => {
      this.isLogged = isLogged;
    })
  }

  public toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  public logout(): void {
    const tokens: TokensType = this.authService.getTokens();
    if (tokens && tokens.refreshToken) {
      this.authService.logout(tokens.refreshToken)
        .subscribe({
          next: (data: DefaultResponseType) => {
            this.forcedLogout();
          },
          error: (error: HttpErrorResponse) => {
            this.forcedLogout();
          }
        })
    }
  }

  private forcedLogout(): void {
    this.authService.removeTokens();
    this.authService.setUserInfo = null;
    this.showMenu = false;
    this.router.navigate(['/']);
    this._matSnackBar.open('Вы успешно вышли из системы', 'Закрыть');
  }

  @HostListener('document:click', ['$event'])
  clickOnDocument(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.header-user-link') && !target.closest('.header-user-menu') && this.showMenu) {
      this.showMenu = false;
    }
  }
}
