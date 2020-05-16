import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { constants } from "../config";

@Injectable()
export class RequestService {
  private _createUrl = constants.apiUrl + "api/request/create";
  private _listUrl = constants.apiUrl + "api/request";
  private _updateUrl = constants.apiUrl + "api/request/update";
  private _listByCategoryUrl = constants.apiUrl + "api/request/category/";
  private _interactUrl = constants.apiUrl + "api/request/interact/";
  private _addCommentUrl = constants.apiUrl + "api/request/addcomment/";
  private _getWithRoleUrl = constants.apiUrl + "api/request/roleassigned/";
  private _summaryUrl = constants.apiUrl + "api/request/summary/";
  private _uploadUrl = constants.apiUrl + "api/request/upload/";

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
  upload(data): Observable<any> {
    return this._http.post<any>(this._uploadUrl, data);
  }
  summary(id): Observable<any> {
    return this._http.get<any>(`${this._summaryUrl}${id}`);
  }
  
}
