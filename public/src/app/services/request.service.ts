import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class RequestService {
  private _createUrl = "http://localhost:3001/api/request/create";
  private _listUrl = "http://localhost:3001/api/request";
  private _updateUrl = "http://localhost:3001/api/request/update";
  private _listByCategoryUrl = "http://localhost:3001/api/request/category/";
  private _interactUrl = "http://localhost:3001/api/request/interact/";
  private _addCommentUrl = "http://localhost:3001/api/request/addcomment/";
  private _getWithRoleUrl = "http://localhost:3001/api/request/roleassigned/";
  private _summaryUrl = "http://localhost:3001/api/request/summary/";

  constructor(private _http: HttpClient, private route: Router) {}

  create(data): Observable<any> {
    return this._http.post<any>(this._createUrl, data);
  }
  list(): Observable<any> {
    return this._http.get<any>(this._listUrl);
  }
  getById(id): Observable<any> {
    return this._http.get<any>(`${this._listUrl}/${id}`);
  }
  listByRole(userid): Observable<any> {
    return this._http.get<any>(`${this._getWithRoleUrl}${userid}`);
  }
  update(data): Observable<any> {
    return this._http.post<any>(this._updateUrl, data);
  }
  getByCategory(category): Observable<any> {
    return this._http.get<any>(`${this._listByCategoryUrl}${category}`);
  }
  interact(id): Observable<any> {
    return this._http.get<any>(`${this._interactUrl}${id}`);
  }
  addComment(data): Observable<any> {
    return this._http.post<any>(this._addCommentUrl, data);
  }
  summary(id): Observable<any> {
    return this._http.get<any>(`${this._summaryUrl}${id}`);
  }
}
