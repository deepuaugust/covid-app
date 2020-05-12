import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { constants } from "../config";

@Injectable()
export class RolesService {
  private _createUrl = constants.apiUrl + "api/roles/create";
  private _listUrl = constants.apiUrl + "api/roles";
  private _updateUrl = constants.apiUrl + "api/roles/update";
  private _listByCategoryUrl = constants.apiUrl + "api/roles/category/";
  private _summaryUrl = constants.apiUrl + "api/roles/summary/";

  constructor(private _http: HttpClient, private route: Router) {}

  create(data): Observable<any> {
    return this._http.post<any>(this._createUrl, data);
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
  summary(): Observable<any> {
    return this._http.get<any>(this._summaryUrl);
  }
}
