import {
    Injectable
  } from '@angular/core';
  import {
    HttpClient
  } from '@angular/common/http';
  import {
    ActivatedRoute,
    Router
  } from '@angular/router'
  import {
    Observable,
    throwError
  } from 'rxjs';
  import {
    map,
    tap,
    catchError
  } from 'rxjs/operators';
  
  
  @Injectable()
  export class UserService {
    private _loginUrl = 'http://localhost:3001/api/auth/login';
    private _signupUrl = 'http://localhost:3001/api/auth/signup';
  
    TOKEN_KEY = 'token'
  
    constructor(private _http: HttpClient, private route: Router) {}
  
    get token() {
      return localStorage.getItem("token");
    }
  
    saveToken(token) {
      localStorage.setItem("token", token)
    }
  
    signup(data): Observable < any > {
      return this._http.post(this._signupUrl, data);
    }
  
    login(loginData): Observable<any> {
      return this._http.post < any > (this._loginUrl, loginData);
    }
  
    logout() {
      localStorage.setItem("token","")
      this.route.navigate(['/login'])
    }
  }