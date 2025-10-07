import { Component, OnInit } from '@angular/core';
import {FACEBOOK_LINK, INSTAGRAM_LINK, VK_LINK} from "../../../../constants/social.constants";
import {ModalConstants} from "../../../../constants/modal.constants";
import {ModalService} from "../../services/modal.service";
import {MenuItemType} from "../../../../types/menu-item.type";
import {SmoothScrollService} from "../../services/smooth-scroll.service";
import {Router} from "@angular/router";

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  menuItems: MenuItemType[] = [
    {name: 'Услуги', link: '/', fragment: 'services', isActive: false},
    {name: 'О нас', link: '/', fragment: 'about', isActive: false},
    {name: 'Статьи', link: '/articles', isActive: false},
    {name: 'Отзывы', link: '/', fragment: 'reviews', isActive: false},
    {name: 'Контакты', link: '/', fragment: 'contacts', isActive: false},
  ]

  instagramLink: string = INSTAGRAM_LINK;
  vkLink: string = VK_LINK;
  facebookLink: string = FACEBOOK_LINK;
  currentYear: number = 2025;

  modalType: string = ModalConstants.consult;

  constructor(private modalService: ModalService,
              private smoothScrollService: SmoothScrollService,
              private router: Router,) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

  setModalType(): void {
    this.modalService.setModalType(this.modalType);
  }

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
        },10)
      }
    }
    linkItem.isActive = true;
  }

}
