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

  constructor(private _http: HttpClient, private route: Router) {}

  create(data): Observable<any> {
    console.log(data)
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