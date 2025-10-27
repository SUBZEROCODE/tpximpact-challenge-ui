import { delay, of } from "rxjs";
import { UrlMapping } from "../../models/url-mapping.model";

export class MockUrlShortenerService {

  static getMockMappingsForTesting(): UrlMapping[]{
    return [
      { alias: 'my-custom-alias', fullUrl: 'https://example.com/some/long/url', shortUrl: 'http://localhost:8080/api/v1/url-shortener/my-custom-alias' },
      { alias: 'my-test-alias', fullUrl: 'https://example.test.com/long/url', shortUrl: 'http://localhost:8080/api/v1/url-shortener/my-test-alias' }
    ];
  }
  getHealthOfAPI() {
    return of('Java Spring is ready to serve the API').pipe(delay(1000));
  }
  getUrlRedirectForAlias() {
    return of('test');
  }
  
  getAllAliasedShortenedUrls() {
    return of(MockUrlShortenerService.getMockMappingsForTesting());
  }

  saveAliasedShortenedUrlMapping() {
    return of("URL successfully shortened");
  }

  deleteMappingMatchingAlias() {
    return of("Successfully deleted");
  }
}