import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { constants } from "../config";

@Injectable()
export class CategoryService {
  private _createUrl = constants.apiUrl + "api/category/create";
  private _listUrl = constants.apiUrl + "api/category";
  private _updateUrl = constants.apiUrl + "api/category/update";
  private _summaryUrl = constants.apiUrl + "api/category/summary/";

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
  summary(): Observable<any> {
    return this._http.get<any>(this._summaryUrl);
  }
}