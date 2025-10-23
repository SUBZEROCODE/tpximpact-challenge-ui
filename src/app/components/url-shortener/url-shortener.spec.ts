import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlShortener } from './url-shortener';
import { provideHttpClient } from '@angular/common/http';
import { UrlShortenerService } from '../../services/url-shortener-service';
import { of } from 'rxjs';
import { MockUrlShortenerService } from '../../testing/mocks/mock-url-shortener-service';

fdescribe('UrlShortener', () => {
  let component: UrlShortener;
  let fixture: ComponentFixture<UrlShortener>;
  let mockUrlShortenerService: MockUrlShortenerService;

  beforeEach(async () => {
    mockUrlShortenerService = new MockUrlShortenerService();
    await TestBed.configureTestingModule({
      imports: [UrlShortener],
      providers: [
        provideHttpClient(),
        { provide: UrlShortenerService, useValue: mockUrlShortenerService}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UrlShortener);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the component up with apiHealth value', () => {
    spyOn(mockUrlShortenerService, 'getHealthOfAPI').and.callThrough();
    const mockHealthResponse = 'Java Spring is ready to serve the API';
    component.ngOnInit();
    expect(mockUrlShortenerService.getHealthOfAPI).toHaveBeenCalled();

    const healthCheckText: HTMLElement = fixture.nativeElement.querySelector(".health-check-text");
    expect(healthCheckText.innerText).toEqual("Time to check if our integration is working: " + mockHealthResponse);
  });

  it('should get the url-redirect for alias only when healthy', () => {
    spyOn(mockUrlShortenerService, 'getHealthOfAPI').and.callThrough();
    spyOn(mockUrlShortenerService, 'getUrlRedirectForAlias').and.callThrough();
    
    const mockHealthResponse = 'Java Spring is ready to serve the API';
    const mockUrlRedirectResponse = 'test';

    component.ngOnInit();

    expect(mockUrlShortenerService.getHealthOfAPI).toHaveBeenCalled();
    expect(mockUrlShortenerService.getUrlRedirectForAlias).toHaveBeenCalled();

    expect(component.apiHealth).toBe(mockHealthResponse);
    expect(component.testAliasResponse).toBe(mockUrlRedirectResponse);
  });
});
