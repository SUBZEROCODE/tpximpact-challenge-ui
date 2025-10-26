// url-mapping-events.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UrlMappingEventsService {
  successMessage$ = new Subject<string>();
  errorMessage$ = new Subject<HttpErrorResponse>();

  emitSuccess(message: string) {
    this.successMessage$.next(message);
  }

  emitError(error: HttpErrorResponse) {
    this.errorMessage$.next(error);
  }
}