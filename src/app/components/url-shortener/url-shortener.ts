import { Component, OnInit, inject } from '@angular/core';
import { UrlShortenerService } from '../../services/url-shortener-service';
import { UrlMapping } from '../../models/url-mapping.model';
import { catchError, Observable, throwError } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShortenedListViewerComponent } from "./shortened-list-viewer/shortened-list-viewer";
import { ErrorMessageViewerComponent } from "./error-message-viewer/error-message-viewer";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-url-shortener',
  templateUrl: './url-shortener.html',
  styleUrl: './url-shortener.scss',
  imports: [CommonModule, RouterModule, ShortenedListViewerComponent, ErrorMessageViewerComponent]
})
export class UrlShortenerComponent implements OnInit {
  private urlShortener = inject(UrlShortenerService);

  errorToHandle?: HttpErrorResponse;

  testAliasResponse: string = "";
  apiHealth: string = "";
  errorMessage: string = "";

  ngOnInit() {

    const healthObservable = this.subscribeToObservableAndUseErrorMessageHandling(
      this.urlShortener.getHealthOfAPI()
    );

    healthObservable.subscribe({
        next: (healthStatus: string) => {
          this.apiHealth = healthStatus;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.errorToHandle = errorResponse;
        }
    });

        // this.urlShortener.getUrlRedirectForAlias("my-custom-alias").subscribe((fullUrlToRedirectTo: string) => {
        //       // eslint-disable-next-line no-undef
        //       console.log("Redirecting to " + fullUrlToRedirectTo);
        //       // window.location.href = fullUrlToRedirectTo;
        //       // this.testAliasResponse = fullUrlToRedirectTo;
        // });

        // const urlMappingTest: UrlMapping = {
        //     alias: "another-custom-alias-v3.1",
        //     fullUrl: "https://example.com/very/long/url/v2/even/longer/again",
        //     shortUrl: "http://localhost:8080/another-custom-alias"
        // };

        // let resultFromSavingMapping: string = this.saveAliasesShortenedUrlMapping(urlMappingTest.fullUrl, urlMappingTest.alias);
        // console.log(resultFromSavingMapping);
    // });
  }

  saveAliasesShortenedUrlMapping(fullUrl: string, alias: string): string {
    let resultToReturn = "";

    const shortenedUrlMappingObservable = this.subscribeToObservableAndUseErrorMessageHandling(
      this.urlShortener.saveAliasedShortenedUrlMapping(fullUrl, alias)
    );

    shortenedUrlMappingObservable.subscribe({
        next: result => {
          resultToReturn = result;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.errorToHandle = errorResponse;
        }
    });
    return resultToReturn;
  }

  redirectToAlias(alias: string) {
    this.urlShortener.getUrlRedirectForAlias(alias);
  }

  getAllAliasUrlMappings(): Observable<UrlMapping[]> {
    return this.urlShortener.getAllAliasedShortenedUrls();
  }

  subscribeToObservableAndUseErrorMessageHandling<T>(methodToSubscribeTo: Observable<T>): Observable<T> {
    return methodToSubscribeTo.pipe(
      catchError(err => {
        this.errorToHandle = err;
        return throwError(() => err); // ✅ return an observable
      })
    );
  }

}
