import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
;

import { provideHttpClient } from '@angular/common/http';
import { MockUrlShortenerService } from '../testing/mocks/mock-url-shortener-service';
import { ExternalRedirectNavigationService } from './external-redirect-navigation-service';
import { UrlShortenerService } from './url-shortener-service';


describe('UrlShortenerService', () => {
  let testService: UrlShortenerService;
  let httpMock: HttpTestingController;
  let externalRedirectNavigationService: ExternalRedirectNavigationService;

  beforeEach(() => {
    externalRedirectNavigationService = new ExternalRedirectNavigationService();
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UrlShortenerService,
        { provide: ExternalRedirectNavigationService, useValue: externalRedirectNavigationService},
      ]
    });

    testService = TestBed.inject(UrlShortenerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should get health of api as string when called', () => {
    const mockResponse = 'Java Spring is ready to serve the API';
    spyOn(testService, 'getHealthOfAPI').and.callThrough();
    
    testService.getHealthOfAPI().subscribe((response: string) => {
      expect(response).toBe(mockResponse);
    });
    const healthRequest = httpMock.expectOne('http://localhost:8080/api/v1/url-shortener/health');
    expect(healthRequest.request.method).toBe('GET');
    healthRequest.flush(mockResponse);

    expect(testService.getHealthOfAPI).toHaveBeenCalled();
  });

  it('should allow external redirect from app with shortUrl within api', () => {
    const alias = 'test-alias';
    const externalRedirectNavigationSpy = spyOn(externalRedirectNavigationService, 'manageWindowRedirect');
    testService.getUrlRedirectForAlias(alias);
    const expectedRedirectShortUrl = `http://localhost:8080/api/v1/url-shortener/${alias}`;
    expect(externalRedirectNavigationSpy).toHaveBeenCalledWith(expectedRedirectShortUrl);
  });

  it('should return all aliased shortened URLs which are matched in backend', () => {
    const mockMappings = MockUrlShortenerService.getMockMappingsForTesting();
    testService.getAllAliasedShortenedUrls().subscribe(returnedUrls => {
      expect(returnedUrls).toEqual(mockMappings);
    });

    const aliasedShortenedUrlsApiEndpoint = `http://localhost:8080/api/v1/url-shortener/urls`;

    const req = httpMock.expectOne(aliasedShortenedUrlsApiEndpoint);
    expect(req.request.method).toBe('GET');
    req.flush(mockMappings);
  });

  it('should save a new shortened URL mapping', () => {
    const alias = 'my-test-alias';
    const fullUrl = 'https://example.com/some/long/url';
    const mockResponseText = 'URL successfully shortened';

    testService.saveAliasedShortenedUrlMapping(fullUrl, alias).subscribe(returnedResponse => {
      expect(returnedResponse).toBe(mockResponseText);
    });

    const saveAliasedShortenedUrlEndpoint = `http://localhost:8080/api/v1/url-shortener/shorten`

    const req = httpMock.expectOne(saveAliasedShortenedUrlEndpoint);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ customAlias: alias, fullUrl });
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.responseType).toBe('text');
    req.flush(mockResponseText);
  });

  it('should delete a matching shortened URL mapping', () => {
    const mockResponseText = 'Successfully deleted';
    const alias = 'test-alias';
    const expectedRedirectShortUrl = `http://localhost:8080/api/v1/url-shortener/${alias}`;

    testService.deleteShortenedUrlMapping(alias).subscribe(response => {
      expect(response.status).toBe(204);
      expect(response.body).toBe(mockResponseText);
    });

    const req = httpMock.expectOne(expectedRedirectShortUrl);
    expect(req.request.method).toBe('DELETE');
    //expect(req.request.observe).toBe('response');

    req.flush('Successfully deleted', { status: 204, statusText: 'No Content' });
  });


});
