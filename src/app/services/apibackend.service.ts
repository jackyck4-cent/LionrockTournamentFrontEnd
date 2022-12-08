import { Injectable } from '@angular/core';
import { DUMMYDATA } from '../shared/dummy_all_data';
import { PlayerInfo } from '../shared/player_info';
import { TnInfo } from '../shared/tn_info';
import { BackendInterface } from './backend-interface';

import { endpoint } from "../shared/endpoint";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators"; 

@Injectable({
  providedIn: 'root',
})

export class ApibackendService {

  endpoint: string = endpoint.url;
  headers = new HttpHeaders().set("Content-Type", "application/json");

  private httpOptions =
  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };



  constructor(private http: HttpClient) 
  {
  } 

  private loadToken(): void
  {
    const token = localStorage.getItem('id_token');
    let authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + authToken);
  }

  getTnList(filters: string[]): Observable<any> {
    this.loadToken();
    let api = `${this.endpoint}/tournments2`;
   
  //  alert(api);
    return this.http.get(api, this.httpOptions ).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getPlayerist(filters: string[]): Observable<any> {
    this.loadToken();
    let api = `${this.endpoint}/tournments2/players`;
    return this.http.get(api, this.httpOptions ).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getTnFullList(filters: string[]): Observable<any> {
    this.loadToken();
    let api = `${this.endpoint}/tournments2/fulllist`;
   
  //  alert(api);
    return this.http.get(api, this.httpOptions ).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getTn(tn_id: string): Observable<any> {
    this.loadToken();
    let api = `${this.endpoint}/tournments2/info/`+tn_id;
   
  //  alert(api);
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
