import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { TeamsAuthService } from '../services/teams-auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public teamsAuthService: TeamsAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.teamsAuthService.getToken();
    if (token) {
        req = req.clone({headers: req.headers.set('Authorization', `Bearer ${ token }`)});
    }
    return next.handle(req);
  }
}