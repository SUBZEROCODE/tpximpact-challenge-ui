import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { UrlShortenerService } from '../../services/url-shortener-service';
import { UrlMapping } from '../../models/url-mapping.model';
import { catchError, Observable, Subscription, throwError } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShortenedListViewerComponent } from "./shortened-list-viewer/shortened-list-viewer";
import { ErrorMessageViewerComponent } from "./error-message-viewer/error-message-viewer";
import { HttpErrorResponse } from '@angular/common/http';
import { SuccessMessageViewerComponent } from './success-message-viewer/success-message-viewer';
import { UrlMappingEventsService } from '../../services/url-mapping-events-service';

@Component({
  selector: 'app-url-shortener',
  templateUrl: './url-shortener.html',
  styleUrl: './url-shortener.scss',
  imports: [CommonModule, RouterModule, ShortenedListViewerComponent, SuccessMessageViewerComponent, ErrorMessageViewerComponent]
})
export class UrlShortenerComponent implements OnInit {
  private urlShortener = inject(UrlShortenerService);
  private events = inject(UrlMappingEventsService);
  private subscriptions = new Subscription();
  
  errorToHandle?: HttpErrorResponse;

  testAliasResponse: string = "";
  apiHealth: string = "";
  errorMessage: string = "";
  responseMessage: string = "";
  urlMappingsToDisplay: UrlMapping[] = [];


  ngOnInit(): void {
    this.checkApiHealth();
    
    this.subscriptions.add(
      this.events.successMessage$.subscribe(message => this.handleSuccess(message))
    );

    this.subscriptions.add(
      this.events.errorMessage$.subscribe(error => this.handleError(error))
    );
  }

  checkApiHealth() {
    const healthObservable = this.subscribeToObservableAndUseErrorMessageHandling(
      this.urlShortener.getHealthOfAPI()
    );

    healthObservable.subscribe({
        next: (healthStatus: string) => {
          this.apiHealth = healthStatus;
          this.handleSuccess("API is now connected");
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.errorToHandle = errorResponse;
        }
    });


  }

  get hasHealthMessageFromApi(){
    return this.apiHealth === 'Java Spring is ready to serve the API';
  }

  redirectToAlias(alias: string) {
    this.urlShortener.getUrlRedirectForAlias(alias);
  }

  subscribeToObservableAndUseErrorMessageHandling<T>(methodToSubscribeTo: Observable<T>): Observable<T> {
    return methodToSubscribeTo.pipe(
      catchError(err => {
        this.errorToHandle = err;
        return throwError(() => err); // ✅ return an observable
      })
    );
  }

  retrieveUrlMappingsFromApiAndDisplay(): void {
    const urlMappingsFoundFromApiObservable = this.subscribeToObservableAndUseErrorMessageHandling(
      this.urlShortener.getAllAliasedShortenedUrls()
    );

    urlMappingsFoundFromApiObservable.subscribe({
        next: (urlMappingsRetrievedFromApi: UrlMapping[]) => {
          this.urlMappingsToDisplay = urlMappingsRetrievedFromApi;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.errorToHandle = errorResponse;
        }
    });
  }

  handleSuccess(response: string): void {
    this.responseMessage = response;
    this.retrieveUrlMappingsFromApiAndDisplay();
    
  }

  handleError(error: HttpErrorResponse): void {
    this.errorToHandle = error;
  }

}
