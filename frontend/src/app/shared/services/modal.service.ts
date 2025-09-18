import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public modalType$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  setModalType(type: string) {
    this.modalType$.next(type);
  }

  sendFormRequest(body: {name: string, phone: string, service?: string, type: string}): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(`${environment.api}requests`, body)
  }
}
