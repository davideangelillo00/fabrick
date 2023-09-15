import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private modalsService: ModalsService) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    /** Adding the Bearer token used to call https://gorest.co.in/ services */
    if (request.url.includes(environment.serverEndpoint)) {
      request = request.clone({setHeaders: {authorization: `Bearer ${environment.token}`}});
    }
    return next.handle(request).pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          /** Generic error management */
          const text = this.errorMessageMapper(error);
          this.modalsService.openModal(ModalComponent, {
            title: 'Oops, an error occurred!',
            text,
            buttonTextCancel: 'Ok'
          });
        }
      })
    );
  }

  private errorMessageMapper(error: HttpErrorResponse): string {
    switch (error.status) {
      case 401:
        return 'Insufficient permission to proceed';
      case 422:
        return 'Email already registered';
      default:
        return error.message || 'Please try again later';
    }
  }
}
