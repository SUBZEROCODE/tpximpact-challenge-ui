import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Wraps an observable with standardized error handling logic.
 *
 * @param methodToSubscribeTo - The observable to wrap.
 * @param onError - A callback to handle the error
 * @returns Observable<T> with error handling applied.
 */
export function subscribeToObservableAndUseErrorMessageHandling<T>(
  methodToSubscribeTo: Observable<T>, onError: (err: HttpErrorResponse) => void
): Observable<T> {
  return methodToSubscribeTo.pipe(
    catchError((err: HttpErrorResponse) => {
      onError(err);
      return throwError(() => err);
    })
  );
}
