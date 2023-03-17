import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  static accessToken = '';
  refresh = false;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //const token: string = this.cookieService.get('token');
    const token: string = localStorage.getItem('token')!;
    let req = request;
    if(token) {
        req = request.clone({
            setHeaders: {
                authorization: `Bearer ${token}`
            }
        });
    }
    return next.handle(req).pipe(
        catchError((err: HttpErrorResponse) => {
            console.log('Error: ' + err.message);
            if(err.status === 401) {
                this.router.navigate(['/login']);
            }
            return throwError(err);
        })
    )
  }
}
