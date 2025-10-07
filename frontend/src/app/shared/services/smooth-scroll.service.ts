import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Location} from '@angular/common';
import {MenuItemType} from "../../../types/menu-item.type";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SmoothScrollService {

  constructor(private location: Location,
              private router: Router,) { }

  scrollTo$: Subject<string> = new Subject<string>();

  scrollTo(linkItem: MenuItemType) {
    const fragment: string | undefined = linkItem.fragment || undefined;
    const currentPath: string = this.router.url.split('#')[0];
    if (currentPath === linkItem.link) {
      // setTimeout(() => {
        this.location.replaceState(linkItem.link + (fragment ? `#${fragment}` : ''));
        this.scrollTo$.next(fragment || '');
      // }, 10)
    } else {
      this.router.navigate([linkItem.link], { fragment });
    }
  }

}
