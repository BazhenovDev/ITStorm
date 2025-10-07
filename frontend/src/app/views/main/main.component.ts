import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, HostListener,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
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
import {SmoothScrollService} from "../../shared/services/smooth-scroll.service";
import {ActivatedRoute} from "@angular/router";
import {ActiveMenuService} from "../../shared/services/active-menu.service";

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {

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
              private servicesService: ServicesService,
              private smoothScrollService: SmoothScrollService,
              private activatedRoute: ActivatedRoute,
              private activeMenuService: ActiveMenuService,) { }

  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.mainSlider = this.sliderService.getMainSlider();
    this.reviewsSlider = this.sliderService.getReviewsSlider();
   const getTopArticlesSub: Subscription = this.articleService.getTopArticles()
      .subscribe((articles: ArticleCardType[])  => {
        this.articlesTop = articles as ArticleCardType[];
      });
   this.subscriptions.add(getTopArticlesSub);
    this.servicesItems = this.servicesService.getServices();

  }

  ngAfterViewInit(): void {

    const activatedRouteSub: Subscription = this.activatedRoute.fragment
      .subscribe(fragment => {
        if (fragment) {
          const scrollToSection: ElementRef<HTMLElement> | undefined = this.scrollSection.find((item: ElementRef<HTMLElement>) => item.nativeElement.id === fragment);
          if (scrollToSection) {
            setTimeout(() => {
              scrollToSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
            }, 10);
          }
        }
      })

    this.subscriptions.add(activatedRouteSub);

    const scrollToSub: Subscription = this.smoothScrollService.scrollTo$
      .subscribe(scrollTo => {
        const scrollToSection = this.scrollSection.find((item: ElementRef<HTMLElement>) => item.nativeElement.id === scrollTo);
        if (scrollToSection) {
          // setTimeout(() => {
            // scrollToSection.nativeElement.scrollIntoView({behavior: 'smooth' });
            const element = scrollToSection.nativeElement;
            const yOffset = -135;
            const scrollTo = element.getBoundingClientRect().top + window.scrollY + yOffset;

            window.scrollTo({ top: scrollTo, behavior: 'smooth' });
        }
      })

    this.subscriptions.add(scrollToSub);
  }

  @ViewChild('owlReviews') owlReviews!: CarouselComponent;
  @ViewChildren('scrollSection') scrollSection!: QueryList<ElementRef<HTMLElement>>;

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

  @HostListener('window:scroll', [])
  scrollHandler() {
    const middlePos = window.scrollY + window.innerHeight / 2;
    this.scrollSection.forEach((section: ElementRef<HTMLElement>) => {
      const sectionElement = section.nativeElement as HTMLElement;
      const domRect = sectionElement.getBoundingClientRect();
      const top = domRect.top + window.scrollY;
      const bottom = top + domRect.height;

      if (middlePos >= top && middlePos <= bottom && sectionElement) {
        this.activeMenuService.setActiveMenu(sectionElement.id);
      } else if (window.scrollY <= 300) {
        this.activeMenuService.setActiveMenu('deleteActiveMenu');
      }
    })
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
