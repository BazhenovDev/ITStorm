import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArticleCardType} from "../../../types/articles.type";
import {environment} from "../../../environments/environment";
import {ServicesType} from "../../../types/services.type";
import {ModalService} from "../services/modal.service";
import {ModalConstants} from "../../../constants/modal.constants";

@Component({
  selector: 'card-info-component',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit {

  @Input() isArticle: boolean = true;
  @Input() articleItem: ArticleCardType = {
    id: '',
    title: '',
    description: '',
    image: '',
    date: '',
    category: '',
    url: ''
  };

  @Input() serviceItem: ServicesType = {
    image: '',
    title: '',
    description: '',
    price: 0,
    type: ''
  }

  staticPath: string = environment.staticApi;
  orderType = ModalConstants.order

  @Output() selectType: EventEmitter<string> = new EventEmitter<string>();

  constructor(private modalService: ModalService,) { }

  ngOnInit(): void {
   this.staticPath = this.isArticle
     ? environment.staticApi
     : 'assets/images/main-page/';
  }

  setModalType(): void {
    this.modalService.setModalType(this.orderType);
    this.selectType.emit(this.serviceItem.type);
  }

}
