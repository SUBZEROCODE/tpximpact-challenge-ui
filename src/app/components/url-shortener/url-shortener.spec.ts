import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UrlShortenerComponent } from './url-shortener';
import { provideHttpClient } from '@angular/common/http';
import { UrlShortenerService } from '../../services/url-shortener-service';
import { MockUrlShortenerService } from '../../testing/mocks/mock-url-shortener-service';

describe('UrlShortenerComponent', () => {
  let component: UrlShortenerComponent;
  let fixture: ComponentFixture<UrlShortenerComponent>;
  let mockUrlShortenerService: MockUrlShortenerService;

  beforeEach(async () => {
    mockUrlShortenerService = new MockUrlShortenerService();
    await TestBed.configureTestingModule({
      imports: [UrlShortenerComponent],
      providers: [
        provideHttpClient(),
        { provide: UrlShortenerService, useValue: mockUrlShortenerService}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UrlShortenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 it('should set the component up with apiHealth value', fakeAsync(() => {
    spyOn(mockUrlShortenerService, 'getHealthOfAPI').and.callThrough();
    const testUrl = "http://localhost:8080/v1/api/shorten/my-custom-alias";
    const customAliasTestMessage = "🚀 Try Custom Alias Test for " + testUrl;
    component.ngOnInit();

    tick(1000);
    expect(mockUrlShortenerService.getHealthOfAPI).toHaveBeenCalled();
    fixture.detectChanges();

    const healthCheckText: HTMLElement = fixture.nativeElement.querySelector("button.btn-outline-success");
    expect(healthCheckText.innerText).toEqual(customAliasTestMessage);
  }));

  it('should get urlMappingsToDisplay when handleSuccess is called', fakeAsync(() => {
    spyOn(mockUrlShortenerService, 'getHealthOfAPI').and.callThrough();
    spyOn(mockUrlShortenerService, 'getAllAliasedShortenedUrls').and.callThrough();
    
    const mockHealthResponse = 'Java Spring is ready to serve the API';

    // Mocking that the api is ready to serve
    component.handleSuccess(mockHealthResponse);

    expect(mockUrlShortenerService.getAllAliasedShortenedUrls).toHaveBeenCalled();

    expect(component.responseMessage).toBe(mockHealthResponse);
    
  }));
});
