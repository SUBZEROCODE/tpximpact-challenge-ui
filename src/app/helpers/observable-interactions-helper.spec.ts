import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { subscribeToObservableAndUseErrorMessageHandling } from './observable-interactions-helper';
import { of, throwError } from 'rxjs';

describe('subscribeToObservableAndUseErrorMessageHandling', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      providers: []
    });
  });

  
  it('should call onError method if an error is found', () => {
    const mockError = new HttpErrorResponse({
      status: 0,
      statusText: 'Unknown Error',
      url: '/api/v1/url-shortener/health',
      error: { message: 'testErrorMessage' }
    });

    const healthObservable = throwError(() => mockError);
    const onErrorSpy = jasmine.createSpy('onError');

    const observableWithErrorHandling = subscribeToObservableAndUseErrorMessageHandling(healthObservable, onErrorSpy);

    observableWithErrorHandling.subscribe({
      next: () => {
        fail('This should never be called')
      },
      error: (err: HttpErrorResponse) => {
        expect(err).toBe(mockError);
        expect(onErrorSpy).toHaveBeenCalledWith(mockError);
      }
    });
  });

  it('should allow Observable to be suscribed to if no errors found', () => {
    const onErrorSpy = jasmine.createSpy('onError');
    const mockHealthMessageReturned = of("Java Spring is ready to serve the API")

    const observableWithErrorHandling = subscribeToObservableAndUseErrorMessageHandling(mockHealthMessageReturned, onErrorSpy);

    observableWithErrorHandling.subscribe({
      next: (value) => {
        expect(value).toBe("Java Spring is ready to serve the API");
        expect(onErrorSpy).not.toHaveBeenCalled();

      },
      error: () => {
        fail('This should never be called')
      }
    });
  });

});