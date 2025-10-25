import { Component, OnInit, inject } from '@angular/core';
import { UrlShortenerService } from '../../services/url-shortener-service';
import { UrlMapping } from '../../models/url-mapping.model';
import { catchError, Observable, throwError } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShortenedListViewerComponent } from "./shortened-list-viewer/shortened-list-viewer";

@Component({
  selector: 'app-url-shortener',
  templateUrl: './url-shortener.html',
  styleUrl: './url-shortener.scss',
  imports: [CommonModule, RouterModule, ShortenedListViewerComponent]
})
export class UrlShortenerComponent implements OnInit {
  private urlShortener = inject(UrlShortenerService);

  testAliasResponse: string = "";
  apiHealth: string = "";
  errorMessage: string = "";

  ngOnInit() {
    this.urlShortener.getHealthOfAPI().subscribe((healthStatus: string) => {
      this.apiHealth = healthStatus;


        // this.urlShortener.getUrlRedirectForAlias("my-custom-alias").subscribe((fullUrlToRedirectTo: string) => {
        //       // eslint-disable-next-line no-undef
        //       console.log("Redirecting to " + fullUrlToRedirectTo);
        //       // window.location.href = fullUrlToRedirectTo;
        //       // this.testAliasResponse = fullUrlToRedirectTo;
        // });

        const urlMappingTest: UrlMapping = {
            alias: "another-custom-alias-v3.1",
            fullUrl: "https://example.com/very/long/url/v2/even/longer/again",
            shortUrl: "http://localhost:8080/another-custom-alias"
        };

        let resultFromSavingMapping: string = this.saveAliasesShortenedUrlMapping(urlMappingTest.fullUrl, urlMappingTest.alias);
        console.log(resultFromSavingMapping);
    });
  }

  saveAliasesShortenedUrlMapping(fullUrl: string, alias: string): string {
    let resultToReturn = "";
    this.urlShortener.saveAliasedShortenedUrlMapping(fullUrl, alias).pipe(
        catchError(err => {
            if (err.status === 400) {
          this.errorMessage = 'Invalid input. Please check your alias or URL.';
          } else {
            this.errorMessage = 'Unexpected error occurred.';
        }
        return throwError(() => err);
      })
      ).subscribe((result) => {
        resultToReturn = result;
    });
    return resultToReturn;
  }

  redirectToAlias(alias: string) {
    this.urlShortener.getUrlRedirectForAlias(alias);
  }

  getAllAliasUrlMappings(): Observable<UrlMapping[]> {
    return this.urlShortener.getAllAliasedShortenedUrls();
  }    
}
