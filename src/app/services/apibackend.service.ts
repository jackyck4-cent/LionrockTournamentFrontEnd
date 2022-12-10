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
//import { AsyncLocalStorage } from 'async_hooks';

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

  getMyUserId(): string {
    let userid = localStorage.getItem("userid");
    if (userid != null)
      return userid;
    else
      return "";
  }
  getMyUserName(): string {
    let display_name = localStorage.getItem("display_name");
    if (display_name != null)
      return display_name;
    else
      return "";
  }

  private loadToken(): void
  {
    const token = localStorage.getItem('id_token');
    if (token != "" && token != null)
    {
    
      let authToken = token;
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + authToken);
    }
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

  getPlayerList(filters: string[]): Observable<any> {
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

    let qstring = "";
    if (filters.length > 0 )
    {
      qstring = "filters="+filters.join(",")
    }
    
    this.loadToken();
    let api = `${this.endpoint}/tournments2/fulllist?`+qstring;

  //  alert(api);
    return this.http.get(api, this.httpOptions ).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // create a tournament
  // return: latest tn_info
  createTn(tn_info: TnInfo): Observable<any> {
    this.loadToken();
    let api = `${this.endpoint}/tournments2/create`;
    return this.http.post(api, tn_info , this.httpOptions ).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // update a tournament
  // return: latest tn_info
  updateTn(tn_info: TnInfo , tn_id: string): Observable<any> {
    this.loadToken();
    let api = `${this.endpoint}/tournments2/update/`+tn_id;
    return this.http.post(api, tn_info , this.httpOptions ).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // register myself to a enrolling tournament
  //     fail if myself has already registered to the tournament
  // return: latest tn_info
  registerTn(tn_id: string): Observable<any> {
    this.loadToken();
    let api = `${this.endpoint}/tournments2/register/`+tn_id;
    return this.http.get(api , this.httpOptions ).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // start a tournament
  //     owner operation only
  // return: latest tn_info
  // if success, then
  //     status: "enroll"->"started"
  //     current_round: start round depends on tournament size
  //                    ('_2'=final, '_4'=semi-final, '_8'=quarter-final, '_16'=round-of-16)
  //     bouts: initialized (see tn_info.ts), players should be placed in current round's bouts
  startTn(tn_id: string): Observable<any> {
    this.loadToken();
    let api = `${this.endpoint}/tournments2/start/`+tn_id;
    return this.http.get(api, this.httpOptions ).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // change enroll start for a tournament (status: "draft"->"enroll")
  //     owner operation only
  // return: latest tn_info
  enrollnow(tn_id: string): Observable<any> {
    this.loadToken();
    let api = `${this.endpoint}/tournments2/enroll/`+tn_id;
    return this.http.get(api, this.httpOptions ).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  removenow(tn_id: string): Observable<any> {
    this.loadToken();
    let api = `${this.endpoint}/tournments2/remove/`+tn_id;
    return this.http.get(api, this.httpOptions ).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // set winners of the current round
  //     owner operation only
  //     status must be "started"
  //     parameter winners is array of winner's username
  // if success, then
  //     winner(s) will advance to next round's bouts
  setRoundWinners(tn_id: string, tn_info: TnInfo): Observable<any> {
    this.loadToken();
    let api = `${this.endpoint}/tournments2/winner/`+tn_id;
    return this.http.post(api, { 'winners' : tn_info }  , this.httpOptions ).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // tournament goes to next round (e.g. from semi-final to final)
  //     owner operation only
  //     status must be "started"
  //     all winners of current round must be set
  // return: latest tn_info
  // if success, then
  //     if the current round is "final", set status to "completed" and the winner of to "champion"
  goNextRoundTn(tn_id: string): Observable<any> {
    this.loadToken();
    let api = `${this.endpoint}/tournments2/nextround/`+tn_id;
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
