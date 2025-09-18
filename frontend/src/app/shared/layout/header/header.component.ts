import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {UserInfoType} from "../../../../types/user-info.type";
import {TokensType} from "../../../../types/tokens.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NavigationEnd, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLogged: boolean = false;
  showMenu: boolean = false;
  @Input() userInfo: UserInfoType | null = null;

  menuItems: { name: string, link: string, fragment?: string, isActive: boolean }[] = [
    {name: 'Услуги', link: '/', fragment: 'services', isActive: false},
    {name: 'О нас', link: '/', fragment: 'about', isActive: false},
    {name: 'Статьи', link: '/articles', isActive: false},
    {name: 'Отзывы', link: '/', fragment: 'reviews', isActive: false},
    {name: 'Контакты', link: '/', fragment: 'contacts', isActive: false},
  ]

  constructor(private authService: AuthService,
              private _matSnackBar: MatSnackBar,
              private router: Router) {
  }

  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {

    const currentPath = window.location.pathname;
    this.menuItems.forEach((item) => {
      const itemPath = item.fragment ? item.link + '#' + item.fragment : item.link;
      const active = currentPath.startsWith(itemPath);
      if (active) {
        item.isActive = true;
      }
    })

    this.isLogged = this.authService.getIsLogged();
    const isLoggedSub = this.authService.isLogged$
      .subscribe(isLogged => {
        this.isLogged = isLogged;
      })
    this.subscriptions.add(isLoggedSub)

    const routerEventsSub = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        const navEnd = event as NavigationEnd;
        this.menuItems.forEach(item => item.isActive = false);
        if (navEnd && navEnd.url) {
          const menuItem = this.menuItems.find(item => {
            let link: string = '';
            if (item.fragment) {
              link = `${item.link}#${item.fragment}`;
            } else {
              link = `${item.link}`;
            }
            return navEnd.url.startsWith(link);
          })
          if (menuItem) {
            menuItem.isActive = true;
          }
        }
      });

    this.subscriptions.add(routerEventsSub);
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

  @HostListener('window:scroll', [])
  clearFragment(): void {
    if (window.scrollY < 150 && this.router.url.includes('#')) {
      const url = this.router.url.split('#')[0] || '/';
      this.menuItems.forEach(item => item.isActive = false);
      if (window.scrollY <= 10) {
        this.router.navigate([url]);
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
