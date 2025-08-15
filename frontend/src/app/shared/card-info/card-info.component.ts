import {Component, Input, OnInit} from '@angular/core';
import {ArticleType} from "../../../types/articles.type";
import {environment} from "../../../environments/environment";
import {ServicesType} from "../../../types/services.type";

@Component({
  selector: 'card-info-component',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit {

  @Input() isArticle: boolean = true;
  @Input() articleItem: ArticleType = {
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

  constructor() { }

  ngOnInit(): void {
   if (this.isArticle) {
     this.staticPath = environment.staticApi;
   } else {
     this.staticPath = 'assets/images/main-page/';
   }
  }



}
