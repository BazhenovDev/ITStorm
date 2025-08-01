import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogged = this.authService.getIsLogged();
  }

}
