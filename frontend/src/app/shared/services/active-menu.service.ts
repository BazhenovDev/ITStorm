import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActiveMenuService {

  constructor() { }

  activeMenu$: Subject<string> = new Subject<string>();

  setActiveMenu(activeMenu: string): void {
    this.activeMenu$.next(activeMenu);
  }

}
