import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";
import {DefaultResponseType} from "../../../types/default-response.type";
import {UserInfoType} from "../../../types/user-info.type";
import {Subscription} from "rxjs";

@Component({
  selector: 'layout-component',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  userInfo: UserInfoType | null = null;
  private isLogged: Boolean = false;

  currentSelectType: string = '';

  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService,) {
  }

  ngOnInit(): void {

    this.isLogged = this.authService.getIsLogged();

    if (this.isLogged) {
      this.loadUserInfo();
    }

    const isLoggedSub = this.authService.isLogged$.subscribe(isLogged => {
      this.isLogged = isLogged;
      if (isLogged) {
        this.loadUserInfo();
      }
    });
    this.subscription.add(isLoggedSub);
  }

  private loadUserInfo() {
    const getUserInfoSub = this.authService.getUserInfo().subscribe({
      next: (data: DefaultResponseType | UserInfoType) => {

        if (data as DefaultResponseType && (data as DefaultResponseType).error) {
          this.userInfo = null;
          throw new Error((data as DefaultResponseType).message);
        }

        this.userInfo = data as UserInfoType;
      },
      error: (error: Error) => {
        console.error(error.message);
      }
    })
    this.subscription.add(getUserInfoSub);
  }

  onActivate(component: any): void {
    if (component.selectType) {
      const componentSub = component.selectType.subscribe((value: string) => {
        this.saveType(value);
      });
      this.subscription.add(componentSub);
    }
  }

  saveType(value: string): void {
    this.currentSelectType = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
