import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {UserInfoType} from "../../../../types/user-info.type";
import {TokensType} from "../../../../types/tokens.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NavigationStart, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {MenuItemType} from "../../../../types/menu-item.type";
import {SmoothScrollService} from "../../services/smooth-scroll.service";
import {ActiveMenuService} from "../../services/active-menu.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLogged: boolean = false;
  showMenu: boolean = false;
  @Input() userInfo: UserInfoType | null = null;

  menuItems: MenuItemType[] = [
    {name: 'Услуги', link: '/', fragment: 'services', isActive: false},
    {name: 'О нас', link: '/', fragment: 'about', isActive: false},
    {name: 'Статьи', link: '/articles', isActive: false},
    {name: 'Отзывы', link: '/', fragment: 'reviews', isActive: false},
    {name: 'Контакты', link: '/', fragment: 'contacts', isActive: false},
  ];

  constructor(private authService: AuthService,
              private _matSnackBar: MatSnackBar,
              private router: Router,
              private smoothScrollService: SmoothScrollService,
              private activeMenuService: ActiveMenuService,) {
  }

  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {

    const currentPath = window.location.pathname + window.location.hash;
    this.menuItems.forEach((item) => {
      const itemPath = item.fragment ? item.link + '#' + item.fragment : item.link;
      const active = currentPath.startsWith(itemPath);
      if (active) {
        item.isActive = true;
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.menuItems.forEach((item) => item.isActive = false);
        const activeMenu = this.menuItems.find((menu) => menu.link.split('/')[1] === event.url.split('/')[1]);
        if (activeMenu) {
          if (activeMenu.link === '/') return;
          activeMenu.isActive = true;
        }
      }
    })

    this.isLogged = this.authService.getIsLogged();
    const isLoggedSub = this.authService.isLogged$
      .subscribe(isLogged => {
        this.isLogged = isLogged;
      });
    this.subscriptions.add(isLoggedSub);

    const activeMenuServiceSub = this.activeMenuService.activeMenu$
      .subscribe((fragment: string) => {
        if (fragment) {
          this.menuItems.forEach((item) => item.isActive = false);
          const activeMenu = this.menuItems.find(item => item.fragment === fragment);
          if (activeMenu) {
            activeMenu.isActive = true;
          }
        }

      });
    this.subscriptions.add(activeMenuServiceSub);
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
        });
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

  // @HostListener('window:scroll', [])
  // clearFragment(): void {
  //   const fragment = this.router.url;
  //   console.log(fragment);
  //   if (window.scrollY <= 150) {
  //     // this.menuItems.forEach((item) => {item.isActive = false;});
  //   }
  // }

  // @HostListener('window:scroll', [])
  // clearFragment(): void {
  //   if (window.scrollY <= 150 && this.router.url.includes('#')) {
  //     const url = this.router.url.split('#')[0] || '/';
  //     this.menuItems.forEach(item => item.isActive = false);
  //     if (window.scrollY <= 10) {
  //       this.router.navigate([url]);
  //     }
  //   }
  // }

  clickOnMenu(linkItem: MenuItemType): void {
    const fragment: string | undefined = linkItem.fragment;
    this.menuItems.forEach((item: MenuItemType) => item.isActive = false);
    if (this.router.url.split('#')[0] === linkItem.link) {
      this.smoothScrollService.scrollTo(linkItem);
    } else {
      this.router.navigate([linkItem.link]);
      if (fragment) {
        setTimeout(() => {
          this.smoothScrollService.scrollTo(linkItem);
        }, 10)
      }
    }
    linkItem.isActive = true;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
