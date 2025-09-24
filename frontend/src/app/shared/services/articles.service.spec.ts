import {ArticlesService} from "./articles.service";
import {TestBed} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";

describe('articles service', () => {

  let articlesService: ArticlesService;

  beforeEach(() => {

    let httpSpy = jasmine.createSpyObj("HttpClient", ["get"]);

    TestBed.configureTestingModule({
      providers: [ArticlesService, {
        provide: HttpClient, useValue: httpSpy
      }],
    })

    articlesService = TestBed.inject(ArticlesService);
  })

  it('should be ', () => {
  })

})
