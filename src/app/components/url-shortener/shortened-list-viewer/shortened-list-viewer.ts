import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { UrlMapping } from '../../../models/url-mapping.model';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UrlShortenerService } from '../../../services/url-shortener-service';
import { subscribeToObservableAndUseErrorMessageHandling } from '../../../helpers/observable-interactions-helper';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-shortened-list-viewer',
  imports: [CommonModule],
  templateUrl: './shortened-list-viewer.html',
  styleUrl: './shortened-list-viewer.scss',
})
export class ShortenedListViewerComponent implements OnInit {
  private urlShortener = inject(UrlShortenerService);
  @Input() urlMappingsReturnedFromApi: Observable<UrlMapping[]> = of([]);
  @Output() deletedUrlMappingObservable = new EventEmitter<string>();
  @Output() errorToHandle = new EventEmitter<HttpErrorResponse>();
  urlMappingsFound: UrlMapping[] = [];

  newAlias: string = '';
  newFullUrl: string = '';

  ngOnInit() {
    this.assignUrlMappingsArrayFromObservable();
  }

  assignUrlMappingsArrayFromObservable(){
    this.urlMappingsReturnedFromApi.subscribe(urlMappingsReturned => {
      this.urlMappingsFound = urlMappingsReturned;
    });
  }

  deleteShortenedUrl(alias: string){
    const deletionUrlMappedObservable = subscribeToObservableAndUseErrorMessageHandling(
      this.urlShortener.deleteShortenedUrlMapping(alias),
      err => this.errorToHandle.emit(err)
    );

    deletionUrlMappedObservable.subscribe({
        next: (response: HttpResponse<string>) => {
          if(response.status === 204){
            this.deletedUrlMappingObservable.emit('Successfully deleted');
          }
          this.assignUrlMappingsArrayFromObservable();

        },
    });
  }

}
