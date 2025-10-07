import {ArticlesService} from "./articles.service";
import {TestBed} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {of} from "rxjs";

describe('articles service', () => {

  let articlesService: ArticlesService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {

    httpSpy = jasmine.createSpyObj("HttpClient", ["get"]);

    TestBed.configureTestingModule({
      providers: [ArticlesService, {
        provide: HttpClient, useValue: httpSpy
      }],
    });

    articlesService = TestBed.inject(ArticlesService);
  });

  it('should call HttpClient.get with top articles url', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of({
      id: '1',
      title: 'title',
      description: 'description',
      image: 'image',
      date: 'date',
      category: 'category',
      url: 'url',
    }));

    articlesService.getTopArticles().subscribe(() => {
      expect(httpSpy.get).toHaveBeenCalledOnceWith(`${environment.api}articles/top`);
      done();
    });
  });

  it('should call HttpClient.get with params articles url', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of({
      count: 1,
      pages: 1,
      items: [{
        id: '1',
        title: 'title',
        description: 'description',
        image: 'image',
        date: 'date',
        category: 'category',
        url: 'url'
      }, {
        id: '2',
        title: 'title',
        description: 'description',
        image: 'image',
        date: 'date',
        category: 'category',
        url: 'url'
      },],
    }));

    const params = {page: 1}

    articlesService.getArticlesWithParams(params).subscribe(() => {
      expect(httpSpy.get).toHaveBeenCalledOnceWith(`${environment.api}articles/`, {params});
      done();
    });
  });

})
