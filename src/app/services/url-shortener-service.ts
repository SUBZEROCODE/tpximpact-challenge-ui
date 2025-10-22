import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {

  private baseUrl = 'http://localhost:8080/api/v1/url-shortener'; // Example API URL
  constructor(private http: HttpClient) {}

  // Get url redirect For a given alias.
  getUrlRedirectForAlias(): Observable<any> {
    return this.http.get(`${this.baseUrl}/some-test-alias`, { responseType: 'text' });
  }

  getHealthOfAPI(): Observable<string> {
    return this.http.get(`${this.baseUrl}/health`, { responseType: 'text' });
  }
}
