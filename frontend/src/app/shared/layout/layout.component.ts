import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";
import {DefaultResponseType} from "../../../types/default-response.type";
import {UserInfoType} from "../../../types/user-info.type";

@Component({
  selector: 'layout-component',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  userInfo: UserInfoType | null = null;
  private isLogged: Boolean = false;

  constructor(private authService: AuthService,) {
  }

  ngOnInit(): void {

    this.isLogged = this.authService.getIsLogged();

    if (this.isLogged) {
      this.authService.getUserInfo().subscribe({
        next: (data: DefaultResponseType | UserInfoType) => {
          this.userInfo = data as UserInfoType;
        }
      })
    }

    this.authService.isLogged$.subscribe(isLogged => {
      this.isLogged = isLogged;
      if (isLogged) {
        this.authService.getUserInfo().subscribe({
          next: (data: DefaultResponseType | UserInfoType) => {
            this.userInfo = data as UserInfoType;
          }
        })
      }
    });

  }
}
