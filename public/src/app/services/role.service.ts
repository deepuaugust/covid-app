import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";


@Injectable()
export class RolesService {
  private _createUrl = "http://localhost:3001/api/roles/create";
  private _listUrl = "http://localhost:3001/api/roles";
  private _updateUrl = "http://localhost:3001/api/roles/update";
  private _listByCategoryUrl = "http://localhost:3001/api/roles/category/";

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
}