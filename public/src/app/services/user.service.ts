import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
  private _loginUrl = "http://localhost:3001/api/auth/login";
  private _signupUrl = "http://localhost:3001/api/auth/signup";
  private _listUrl = "http://localhost:3001/api/user";
  private _listUrlByRole = "http://localhost:3001/api/user/role";
  private _listwithquery = "http://localhost:3001/api/user/listwithquery";

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

  dynamicList(query): Observable<any> {
    return this._http.post<any>(this._listwithquery, query);
  }
}
