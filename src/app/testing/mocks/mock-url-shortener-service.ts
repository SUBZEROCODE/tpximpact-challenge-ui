import { delay, of } from "rxjs";

export class MockUrlShortenerService {
  getHealthOfAPI() {
    return of('Java Spring is ready to serve the API').pipe(delay(1000));
  }
  getUrlRedirectForAlias() {
    return of('test');
  }
  
  getAllAliasedShortenedUrls() {
    let mockMappings = [
      { customAlias: 'my-custom-alias', fullUrl: 'https://example.com' },
      { customAlias: 'another-custom-alias', fullUrl: 'https://angular.io' }
    ];
    return of(mockMappings);
  }

  saveAliasedShortenedUrlMapping() {
    return of("URL successfully shortened");
  }
}