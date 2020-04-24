import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

@Injectable()
export class UserService {
  private _loginUrl = "http://localhost:3001/api/auth/login";
  private _signupUrl = "http://localhost:3001/api/auth/signup";
  private _listUrl = "http://localhost:3001/api/user";
  private _listwithquery = "http://localhost:3001/api/user/listwithquery";

  TOKEN_KEY = "token";

  constructor(private _http: HttpClient, private route: Router) {}

  get token() {
    return localStorage.getItem("token");
  }

  saveToken(token) {
    localStorage.setItem("token", token);
  }

  signup(data): Observable<any> {
    return this._http.post(this._signupUrl, data);
  }

  login(loginData): Observable<any> {
    return this._http.post<any>(this._loginUrl, loginData);
  }

  logout() {
    localStorage.setItem("token", "");
    this.route.navigate(["/login"]);
  }

  list(key,value): Observable<any> {
    return this._http.get<any>(`${this._listUrl}/${key}/${value}`);
  }

  dynamicList(query): Observable<any> {
    return this._http.post<any>(this._listwithquery, query);
  }
}

@Injectable()
export class CategoryService {
  private _createUrl = "http://localhost:3001/api/category/create";
  private _listUrl = "http://localhost:3001/api/category";
  private _updateUrl = "http://localhost:3001/api/category/update";

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
}

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
