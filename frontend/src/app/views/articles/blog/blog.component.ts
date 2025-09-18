import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ArticlesService} from "../../../shared/services/articles.service";
import {ArticlesType} from "../../../../types/articles.type";
import {ActivatedRoute, Router} from "@angular/router";
import {QueryParamsType} from "../../../../types/query-params.type";
import {CategoriesType} from "../../../../types/categories.type";
import {CategoriesService} from "../../../shared/services/categories.service";
import {debounceTime, Subscription} from "rxjs";

@Component({
  selector: 'blog-component',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  constructor(private articlesService: ArticlesService,
              private router: Router,
              private categoriesService: CategoriesService,
              private activatedRoute: ActivatedRoute,) {
  }

  articles: ArticlesType | null = null;
  categories: CategoriesType[] = [];
  pages: number[] = [];
  currentPage: number = 1;
  queryParams: QueryParamsType = {};
  filterParams: CategoriesType[] = [];

  showFilter: boolean = false;

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.filterParams = [];
    this.queryParams = {};
    const getCategoriesSub = this.categoriesService.getCategories()
      .subscribe((categoriesResponse: CategoriesType[]) => {
        this.categories = categoriesResponse;
        if (this.queryParams.categories && this.queryParams.categories.length > 0) {
          this.setFilters(this.queryParams.categories);
        }
      });
    this.subscription.add(getCategoriesSub);

    this.load();
  }

  load() {
    const routerQueryParamsSub = this.activatedRoute.queryParams
      // .pipe(debounceTime(800))
      .subscribe(params => {
        if (params) {
          this.queryParams.page = +params['page'] || 1;
          this.currentPage = +params['page'] || 1;
          const queryCategoriesParams = params['categories']
          this.queryParams.categories = Array.isArray(queryCategoriesParams)
            ? queryCategoriesParams
            : queryCategoriesParams
              ? [queryCategoriesParams]
              : [];

          if (this.queryParams.categories.length > 0 && this.categories.length > 0) {
            this.setFilters(this.queryParams.categories);
          } else {
            this.setFilters([]);
          }

        }
        const getArticlesWithParamsSub = this.articlesService.getArticlesWithParams(params)
          .subscribe((response: ArticlesType) => {
            this.articles = response;
            this.pages.length = 0;
            for (let i = 0; i < response?.pages; i++) {
              this.pages.push(i + 1);
            }
          });
        this.subscription.add(getArticlesWithParamsSub);
      })

    this.subscription.add(routerQueryParamsSub)
  }

  updatePaginationButton(page: number) {
    if (page === 0) return;
    if (page > this.pages.length) return;
    if (page === this.currentPage) return;
    this.currentPage = page;
    this.queryParams.page = page;

    this.router.navigate(['/articles'], {queryParams: this.queryParams});
  }

  clickOnFilter(): void {
    this.showFilter = !this.showFilter;
  }

  @HostListener('document:click', ['$event'])
  clickOnWindow(event: MouseEvent): void {
    const sortingElement = (event.target as HTMLElement).closest('.blog-head-sorting');
    if (this.showFilter && (!sortingElement)) {
      this.showFilter = false;
    }
  }

  toggleSort(filter: CategoriesType): void {
    if (this.queryParams.categories && this.queryParams.categories.length > 0) {
      const result: string | undefined = this.queryParams.categories.find(category => category === filter.url);
      if (result) {
        this.queryParams.categories = this.queryParams.categories.filter(category => category !== filter.url);
      } else {
        this.queryParams.categories = [...this.queryParams.categories, filter.url];
      }
    } else {
      this.queryParams.categories = [];
      this.queryParams.categories = [filter.url];
    }

    this.router.navigate(['/articles'], {queryParams: this.queryParams});
  }


  activeFilterClass(filter: string): boolean {
    return !!this.queryParams.categories?.find(item => item === filter);
  }

  setFilters(params: string[]): void {
    const queryFilterParams: CategoriesType[] = [];
    for (let category of params) {
      const foundFilterParam: CategoriesType | undefined = this.categories.find(item => item.url === category);
      if (foundFilterParam) {
        queryFilterParams.push(foundFilterParam);
      }
    }
    this.filterParams = queryFilterParams;
  }

  removeFilterCategory(filter: CategoriesType): void {
    this.queryParams.categories = this.queryParams.categories?.filter(category => category !== filter.url);
    console.log(filter)
    this.filterParams = this.filterParams.filter(category => category.id !== filter.id);
    this.router.navigate(['/articles'], {queryParams: this.queryParams});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
