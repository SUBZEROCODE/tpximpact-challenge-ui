import { Component, Input } from '@angular/core';
import { UrlMapping } from '../../../models/url-mapping.model';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shortened-list-viewer',
  imports: [CommonModule],
  templateUrl: './shortened-list-viewer.html',
  styleUrl: './shortened-list-viewer.scss',
})
export class ShortenedListViewerComponent {
  @Input() urlMappingsReturnedFromApi: Observable<UrlMapping[]> = of([]);
  urlMappingsFound: UrlMapping[] = [];

  ngOnInit() {
    this.urlMappingsReturnedFromApi.subscribe(urlMappingsReturned => {
      this.urlMappingsFound = urlMappingsReturned;
    });
  }



}
