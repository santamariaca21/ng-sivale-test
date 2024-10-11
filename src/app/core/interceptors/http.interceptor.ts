import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {delay, Observable, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { InterceptorOptions } from './Interceptor-options';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class CoreHttpInterceptor implements HttpInterceptor {
  private defaultOptions: InterceptorOptions = {
    showLoader: true,
  };

  constructor(
    private loaderService: LoaderService,
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const options: InterceptorOptions = {
      ...this.defaultOptions,
      ...JSON.parse(req.headers.get('meta') || '{}'),
    };
    req = req.clone({
      headers: req.headers.delete('meta'),
    });
    if (options.showLoader) {
      this.loaderService.turnOnRequest();
    }
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          if (options.showLoader) {
            this.loaderService.turnOffRequest();
          }
        }
      }),
      catchError((error) => {
        if (options.showLoader) {
          this.loaderService.turnOffRequest();
        }
        return throwError(error);
      }),
    );
  }
}
