import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {User} from './user.model';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from "@angular/router";
import {getToken} from "codelyzer/angular/styles/cssLexer";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;
  private _userId;
  private endpoint: string = 'http://localhost:4000/api/users';
  private httpHeaders = new HttpHeaders().set('Content-type', 'application/json');

  constructor(private http: HttpClient, private router: Router) { }

  get userIsAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  get userId() {
    return this._userId;
  }

  getUsers() {
    return this.http.get(this.endpoint);
  }


  addUser(data: User) {
    const API_URL = this.endpoint + '/register';
    return this.http.post(API_URL, data)
        .pipe(
            catchError(this.errorMgmt)
        );
  }

  getUser(id: string) {
    return this.http.get(this.endpoint + '/' + id);
  }


  login(data: User) {
    const API_URL = this.endpoint + '/login';
    this.http.post(API_URL, data).pipe(catchError(this.errorMgmt));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    let authToken = this.getToken();
    if (authToken !== null ) {
      return this._userIsAuthenticated = true;
    } else {
      this._userIsAuthenticated = false;
    }
  }

  logout() {
    let removeToken = localStorage.removeItem('token');
    if (removeToken == null) {
      this.router.navigateByUrl('/auth');
    }
  }

  updateUser(user: User) {
    this.http.post(this.endpoint + '/update' + this._userId, user);
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    } else {
      errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMsg);
    return throwError(errorMsg);
  }
}
