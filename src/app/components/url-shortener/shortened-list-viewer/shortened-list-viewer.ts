import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UrlMapping } from '../../../models/url-mapping.model';
import { CommonModule } from '@angular/common';
import { UrlShortenerService } from '../../../services/url-shortener-service';
import { subscribeToObservableAndUseErrorMessageHandling } from '../../../helpers/observable-interactions-helper';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UrlMappingComponent } from "./url-mapping-component/url-mapping-component";
import { UrlMappingEventsService } from '../../../services/url-mapping-events-service';

@Component({
  selector: 'app-shortened-list-viewer',
  imports: [CommonModule, UrlMappingComponent],
  templateUrl: './shortened-list-viewer.html',
  styleUrl: './shortened-list-viewer.scss',
})
export class ShortenedListViewerComponent {
  private urlShortener = inject(UrlShortenerService);
  private urlEventsMappingService = inject(UrlMappingEventsService);
  @Input() urlMappingsReturnedFromApi: UrlMapping[] = [];
  @Output() successMessage = new EventEmitter<string>();
  @Output() errorToHandle = new EventEmitter<HttpErrorResponse>();

  newAlias: string = '';
  newFullUrl: string = '';

  deleteShortenedUrl(alias: string){
    const deletionUrlMappedObservable = subscribeToObservableAndUseErrorMessageHandling(
      this.urlShortener.deleteShortenedUrlMapping(alias),
      err => this.errorToHandle.emit(err)
    );

    deletionUrlMappedObservable.subscribe({
        next: (response: HttpResponse<string>) => {
          if(response.status === 204){
            this.successMessage.emit('Successfully deleted');
          }
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.urlEventsMappingService.emitError(errorResponse);
        }
    });
  }
}
