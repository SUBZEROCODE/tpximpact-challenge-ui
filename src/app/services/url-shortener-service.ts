import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlMapping } from '../models/url-mapping.model';
import { ExternalRedirectNavigationService } from './external-redirect-navigation-service';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/v1/url-shortener';

  constructor(private externalRedirect: ExternalRedirectNavigationService){}

  // Get url redirect For a given alias.
  getUrlRedirectForAlias(customAlias: string): void {
    this.externalRedirect.manageWindowRedirect(`http://localhost:8080/api/v1/url-shortener/${customAlias}`);
  }

  getHealthOfAPI(): Observable<string> {
    return this.http.get(`${this.baseUrl}/health`, { responseType: 'text' });
  }

  getAllAliasedShortenedUrls(): Observable<UrlMapping[]> {
    return this.http.get<UrlMapping[]>(`${this.baseUrl}/urls`);
  }

  saveAliasedShortenedUrlMapping(customAlias: string, fullUrl: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/shorten`, {customAlias, fullUrl}, { headers: { 'Content-Type': 'application/json' }, responseType: 'text' as const });
  }

  deleteShortenedUrlMapping(customAlias: string): Observable<HttpResponse<string>> {
    return this.http.delete<string>(`${this.baseUrl}/${customAlias}`, {observe: 'response'});
  }
}
