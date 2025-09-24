import { Component, OnInit } from '@angular/core';
import {FACEBOOK_LINK, INSTAGRAM_LINK, VK_LINK} from "../../../../constants/social.constants";
import {ModalConstants} from "../../../../constants/modal.constants";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  instagramLink: string = INSTAGRAM_LINK;
  vkLink: string = VK_LINK;
  facebookLink: string = FACEBOOK_LINK;
  currentYear: number = 2025;

  modalType: string = ModalConstants.consult;

  constructor(private modalService: ModalService,) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

  setModalType(): void {
    this.modalService.setModalType(this.modalType);
  }

}
