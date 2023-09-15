import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StoreService } from '../services/store.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private storeService: StoreService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.storeService.showLoader();
    return next.handle(request).pipe(tap({
      complete: () => { this.storeService.hideLoader() },
      error: () => { this.storeService.hideLoader() }
    }));
  }
}
