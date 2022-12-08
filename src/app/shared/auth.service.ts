import { Injectable } from "@angular/core";
import { User } from "./user";
import { endpoint } from "./endpoint";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  endpoint: string = endpoint.url;
  headers = new HttpHeaders().set("Content-Type", "application/json");
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {}

  private httpOptions =
  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  private loadToken(): void
  {
    const token = localStorage.getItem('id_token');
    let authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + authToken);
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/users/register`;
    return this.http.post(api, user , this.httpOptions);
  }
  //catchError(this.handleError)

  // Sign-in
  signIn(user: User) {
  //  console.log(user);
    return this.http
      .post<any>(`${this.endpoint}/users/login`, user , this.httpOptions)
      .subscribe((res: any) => {
        
        if (res.status == 1 )
        {
          /*
          Jacky
          Provide display name, reference for interface
          */
          localStorage.setItem("access_token", res.token);

          localStorage.setItem("display_name", res.user.display_name);
          localStorage.setItem("role", res.user.role);
          localStorage.setItem("userid", res.user.user_id);
          /*
          this.getUserProfile(res._id).subscribe((res) => {
            this.currentUser = res;
            //this.router.navigate(["user-profile/" + res.msg._id]);
          });
          */
          this.router.navigate(["profile"]);
        }
        else
          alert("Login / password incorrect");
        
      });
  }

  getToken() {
    return localStorage.getItem("access_token");
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem("access_token");
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem("access_token");
    if (removeToken == null) {
      this.router.navigate(["log-in"]);
    }
  }

  // User profile
  getMe(): Observable<any> {
    this.loadToken();
    let api = `${this.endpoint}/users/me`;
    return this.http.get(api, this.httpOptions ).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
