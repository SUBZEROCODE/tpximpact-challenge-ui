import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/v1/url-shortener';

  // Get url redirect For a given alias.
  getUrlRedirectForAlias(): Observable<string> {
    return this.http.get(`${this.baseUrl}/some-test-alias`, { responseType: 'text' });
  }

  getHealthOfAPI(): Observable<string> {
    return this.http.get(`${this.baseUrl}/health`, { responseType: 'text' });
  }
}
