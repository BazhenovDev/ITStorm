import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ArticlesType, ArticleCardType, ArticleType} from "../../../types/articles.type";
import {QueryParamsType} from "../../../types/query-params.type";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  public getTopArticles(): Observable<ArticleCardType[]> {
    return this.http.get<ArticleCardType[]>(`${environment.api}articles/top`);
  }

  public getArticlesWithParams(params: QueryParamsType): Observable<ArticlesType> {
    return this.http.get<ArticlesType>(`${environment.api}articles`, {params});
  }

  public getArticle(url: string): Observable<ArticleType> {
    return this.http.get<ArticleType>(`${environment.api}articles/${url}`);
  }

  public getRelatedArticles(url:string): Observable<ArticleCardType[]> {
    return this.http.get<ArticleCardType[]>(`${environment.api}articles/related/${url}`);
  }
}
