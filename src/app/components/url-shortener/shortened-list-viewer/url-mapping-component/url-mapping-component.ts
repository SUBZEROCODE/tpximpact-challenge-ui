import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UrlShortenerService } from '../../../../services/url-shortener-service';
import { HttpErrorResponse } from '@angular/common/http';
import { subscribeToObservableAndUseErrorMessageHandling } from '../../../../helpers/observable-interactions-helper';
import { UrlMappingEventsService } from '../../../../services/url-mapping-events-service';

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

  addNewUrlMapping(): void {
    if (!this.aliasGiven || !this.fullUrlGiven) {
      alert('Please enter both alias and full URL to save');
      return;
    }

    const shortenedUrlMappingObservable = subscribeToObservableAndUseErrorMessageHandling(
      this.urlShortener.saveAliasedShortenedUrlMapping(this.aliasGiven, this.fullUrlGiven),
      err => this.errorToHandle.emit(err)
    );

    shortenedUrlMappingObservable.subscribe({
        next: successResultMessage => {
          this.urlEventsMappingService.emitSuccess(successResultMessage)
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.urlEventsMappingService.emitError(errorResponse);
        }
    });
  }


}
