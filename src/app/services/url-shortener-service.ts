import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlMapping } from '../models/url-mapping.model';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/v1/url-shortener';

  // Get url redirect For a given alias.
  getUrlRedirectForAlias(customAlias: string): void {
    window.location.href= `http://localhost:8080/api/v1/url-shortener/${customAlias}`;
  }

  getHealthOfAPI(): Observable<string> {
    return this.http.get(`${this.baseUrl}/health`, { responseType: 'text' });
  }

  getAllAliasedShortenedUrls(): Observable<UrlMapping[]> {
    return this.http.get<UrlMapping[]>(`${this.baseUrl}/urls`);
  }

  saveAliasedShortenedUrlMapping(fullUrl: string, customAlias: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/shorten`, {fullUrl, customAlias}, { responseType: 'text' as const });
  }

  deleteShortenedUrlMapping(customAlias: string): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${customAlias}`, { responseType: 'text' });
  }
}
