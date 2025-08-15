import { Component, OnInit } from '@angular/core';
import {SliderType} from "../../../types/slider.type";
import {SliderService} from "../../shared/services/slider.service";
import {OwlOptions} from "ngx-owl-carousel-o";
import {ReviewType} from "../../../types/review.type";
import {ArticleType} from "../../../types/articles.type";
import {ArticlesService} from "../../shared/services/articles.service";
import {ServicesType} from "../../../types/services.type";
import {ServicesService} from "../../shared/services/services.service";

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  mainSlider: SliderType[] = [];
  reviewsSlider: ReviewType[] = [];
  articlesTop: ArticleType[] = [];
  services: ServicesType[] = [];

  showCustomSlider: boolean = true;

  constructor(private sliderService: SliderService,
              private articleService: ArticlesService,
              private servicesService: ServicesService,) { }

  ngOnInit(): void {
    this.mainSlider = this.sliderService.getMainSlider();
    this.reviewsSlider = this.sliderService.getReviewsSlider();
    this.articleService.getTopArticles()
      .subscribe((articles: ArticleType[])  => {
        this.articlesTop = articles as ArticleType[];
      });
    this.services = this.servicesService.getServices();
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 26,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      840: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: this.reviewsSlider.length > 1
  }
}
