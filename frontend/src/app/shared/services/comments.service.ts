import {Injectable} from '@angular/core';
import {ActionsCommentsType, AllCommentTypes, CommentType, SendCommentType} from "../../../types/comment.type";
import {Observable, Subject} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {
  }

  sendComment(body: SendCommentType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(`${environment.api}comments`, body)
  }

  getComments(params: { offset: number, article: string }): Observable<AllCommentTypes> {
    return this.http.get<AllCommentTypes>(`${environment.api}comments`, {params})
  }

  updateReaction(idComment: string, body: {action: string}): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(`${environment.api}comments/${idComment}/apply-action`, body)
  }

  getActionForComments(idComment: string): Observable<ActionsCommentsType[] | DefaultResponseType> {
    return this.http.get<ActionsCommentsType[] | DefaultResponseType>(`${environment.api}comments/${idComment}/actions`)
  }

  getAllActionForComments(idArticle: string): Observable<ActionsCommentsType[] | DefaultResponseType> {
    return this.http.get<ActionsCommentsType[] | DefaultResponseType>(`${environment.api}comments/article-comment-actions?articleId=${idArticle}`)
  }
}
