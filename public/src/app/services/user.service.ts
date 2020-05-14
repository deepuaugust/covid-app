import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { constants } from "../config";

@Injectable()
export class UserService {
  private _loginUrl = constants.apiUrl + "api/auth/login";
  private _signupUrl = constants.apiUrl + "api/auth/signup";
  private _listUrl = constants.apiUrl + "api/user";
  private _listUrlByRole = constants.apiUrl + "api/user/role";
  private _getassigneeUrl = constants.apiUrl + "api/user/getassignee";
  private _summaryUrl = constants.apiUrl + "api/user/summary/";
  private _getByIdUrl = constants.apiUrl + "api/user/";
  private _updateUserUrl = constants.apiUrl + "api/user/update";

  TOKEN_KEY = "token";

  constructor(private _http: HttpClient, private route: Router) {}

  get token() {
    return localStorage.getItem("token");
  }

  saveTokenUser(token, role, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", user);
  }

  signup(data): Observable<any> {
    return this._http.post(this._signupUrl, data);
  }
  update(data): Observable<any> {
    return this._http.post(this._updateUserUrl, data);
  }

  login(loginData): Observable<any> {
    return this._http.post<any>(this._loginUrl, loginData);
  }

  logout() {
    localStorage.setItem("user", "");
    localStorage.setItem("token", "");
    localStorage.setItem("role", "");
    this.route.navigate(["/login"]);
  }

  list(): Observable<any> {
    return this._http.get<any>(this._listUrl);
  }

  listUrlByRole(role): Observable<any> {
    return this._http.get<any>(`${this._listUrlByRole}/${role}`);
  }

  getAssignee(query): Observable<any> {
    return this._http.post<any>(this._getassigneeUrl, query);
  }
  summary(type): Observable<any> {
    return this._http.get<any>(`${this._summaryUrl}${type}`);
  }
  getById(id): Observable<any> {
    return this._http.get<any>(`${this._getByIdUrl}${id}`);
  }
}
