import { TestBed } from '@angular/core/testing';;
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { UrlShortenerService } from './url-shortener-service';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';


describe('UrlShortenerService', () => {
  let testService: UrlShortenerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UrlShortenerService,
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
    spyOn(testService, 'getHealthOfAPI').and.returnValue(of(mockResponse))
    
    testService.getHealthOfAPI().subscribe((response: string) => {
      expect(response).toBe(mockResponse);
    });
    expect(testService.getHealthOfAPI).toHaveBeenCalled();
  });



  
});
