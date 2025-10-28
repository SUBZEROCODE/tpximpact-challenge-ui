import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { subscribeToObservableAndUseErrorMessageHandling } from '../../../../helpers/observable-interactions-helper';
import { UrlMappingEventsService } from '../../../../services/url-mapping-events-service';
import { UrlShortenerService } from '../../../../services/url-shortener-service';

@Component({
  selector: 'app-url-mapping-component',
  imports: [FormsModule],
  templateUrl: './url-mapping-component.html',
  styleUrl: './url-mapping-component.scss',
})
export class UrlMappingComponent {
  private urlShortener = inject(UrlShortenerService);
  private urlEventsMappingService = inject(UrlMappingEventsService);

  aliasGiven: string = '';
  fullUrlGiven: string = '';
  @Output() successMessage = new EventEmitter<string>();
  @Output() errorToHandle = new EventEmitter<HttpErrorResponse>();
  shortenedUrlMappingObservable: Observable<string> = new Observable();

  addNewUrlMapping(): void {
    if (!this.fullUrlGiven) {
      alert('Please enter a full URL to save');
      return;
    }

    if(this.aliasGiven==''){
      this.shortenedUrlMappingObservable = subscribeToObservableAndUseErrorMessageHandling(
        this.urlShortener.saveAliasedShortenedUrlMapping(this.fullUrlGiven),
        err => this.errorToHandle.emit(err)
      )
    } else {
      this.shortenedUrlMappingObservable = subscribeToObservableAndUseErrorMessageHandling(
        this.urlShortener.saveAliasedShortenedUrlMapping(this.fullUrlGiven, this.aliasGiven),
        err => this.errorToHandle.emit(err)
      )
    }

    this.shortenedUrlMappingObservable.subscribe({
        next: successResultMessage => {
          this.urlEventsMappingService.emitSuccess(successResultMessage)
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.urlEventsMappingService.emitError(errorResponse);
        }
    });
  }


}
