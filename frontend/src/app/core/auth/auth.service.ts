import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private isLogged$: Subject<boolean> = new Subject<boolean>();
  private isLogged: boolean = false;

  public getIsLogged(): boolean {
    return this.isLogged;
  }

}
