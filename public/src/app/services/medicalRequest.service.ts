import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { constants } from "../config";

@Injectable()
export class MedicalRequestService {
  private _createUrl = constants.apiUrl + "api/medicalrequest/create";
  private _getWithRoleUrl =
    constants.apiUrl + "api/medicalrequest/roleassigned/";
  private _listUrl = constants.apiUrl + "api/medicalrequest";
  private _uploadUrl = constants.apiUrl + "api/medicalrequest/upload/";

  private _updateUrl = constants.apiUrl + "api/request/update";
  private _listByCategoryUrl = constants.apiUrl + "api/request/category/";
  private _interactUrl = constants.apiUrl + "api/request/interact/";
  private _addCommentUrl = constants.apiUrl + "api/request/addcomment/";
  private _summaryUrl = constants.apiUrl + "api/request/summary/";

  constructor(private _http: HttpClient, private route: Router) {}

  create(data): Observable<any> {
    return this._http.post<any>(this._createUrl, data);
  }
  listByRole(userid): Observable<any> {
    return this._http.get<any>(`${this._getWithRoleUrl}${userid}`);
  }
  getById(id): Observable<any> {
    return this._http.get<any>(`${this._listUrl}/${id}`);
  }
  upload(data): Observable<any> {
    return this._http.post<any>(this._uploadUrl, data);
  }

  list(): Observable<any> {
    return this._http.get<any>(this._listUrl);
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
