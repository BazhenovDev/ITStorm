import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {SliderType} from "../../../types/slider.type";
import {SliderService} from "../../shared/services/slider.service";
import {CarouselComponent, OwlOptions} from "ngx-owl-carousel-o";
import {ReviewType} from "../../../types/review.type";
import {ArticleCardType} from "../../../types/articles.type";
import {ArticlesService} from "../../shared/services/articles.service";
import {ServicesType} from "../../../types/services.type";
import {ServicesService} from "../../shared/services/services.service";
import {FACEBOOK_LINK, INSTAGRAM_LINK, VK_LINK} from "../../../constants/social.constants";
import {Subscription} from "rxjs";

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  mainSlider: SliderType[] = [];
  reviewsSlider: ReviewType[] = [];
  articlesTop: ArticleCardType[] = [];
  servicesItems: ServicesType[] = [];

  @Output() selectType: EventEmitter<string> = new EventEmitter<string>();

  currentSelectType: string = '';

  showCustomSlider: boolean = true;

  instagramLink: string = INSTAGRAM_LINK;
  vkLink: string = VK_LINK;
  facebookLink: string = FACEBOOK_LINK;

  constructor(private sliderService: SliderService,
              private articleService: ArticlesService,
              private servicesService: ServicesService,) { }

  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.mainSlider = this.sliderService.getMainSlider();
    this.reviewsSlider = this.sliderService.getReviewsSlider();
   const getTopArticlesSub = this.articleService.getTopArticles()
      .subscribe((articles: ArticleCardType[])  => {
        this.articlesTop = articles as ArticleCardType[];
      });
   this.subscriptions.add(getTopArticlesSub);
    this.servicesItems = this.servicesService.getServices();
  }

  @ViewChild('owlReviews') owlReviews!: CarouselComponent;

  prevReview(): void {
    this.owlReviews.prev();
  }

  nextReview(): void {
    this.owlReviews.next();
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 26,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 8000,
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
    nav: !!this.reviewsSlider && this.reviewsSlider.length > 1
  }
  saveType(type: string) {
    this.currentSelectType = type;
    this.selectType.emit(type);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
