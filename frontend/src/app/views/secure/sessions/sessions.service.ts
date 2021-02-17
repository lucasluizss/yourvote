import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import SessionModel from './sessions.model';
import Result from 'src/app/models/result.model';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  private readonly url = {
    currentSessions: `/sessions/current`,
    expiredSessions: `/sessions/expired`,
    futureSessions: `/sessions/future`,
  };

  constructor(private readonly http: HttpClient) { }

  getCurrentSessions(): Observable<Result<SessionModel[]>> {
    return this.http.get<Result<SessionModel[]>>(this.url.currentSessions);
  }

  getExpiredessions(): Observable<Result<SessionModel[]>> {
    return this.http.get<Result<SessionModel[]>>(this.url.expiredSessions);
  }

  getFutureSessions(): Observable<Result<SessionModel[]>> {
    return this.http.get<Result<SessionModel[]>>(this.url.futureSessions);
  }
}
