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
    const customAliasTestMessage = "Try Custom Alias Test";
    component.ngOnInit();

    tick(1000);
    expect(mockUrlShortenerService.getHealthOfAPI).toHaveBeenCalled();
    fixture.detectChanges();

    const healthCheckText: HTMLElement = fixture.nativeElement.querySelector("button.btn.btn-light");
    expect(healthCheckText.innerText).toEqual(customAliasTestMessage);
  }));

  it('should get the url-redirect for alias only when healthy', fakeAsync(() => {
    spyOn(mockUrlShortenerService, 'getHealthOfAPI').and.callThrough();
    spyOn(mockUrlShortenerService, 'saveAliasedShortenedUrlMapping').and.callThrough();
    
    const mockHealthResponse = 'Java Spring is ready to serve the API';

    component.ngOnInit();

    expect(mockUrlShortenerService.getHealthOfAPI).toHaveBeenCalled();
    expect(mockUrlShortenerService.saveAliasedShortenedUrlMapping).toHaveBeenCalledTimes(0);
    tick(1000);
    expect(mockUrlShortenerService.saveAliasedShortenedUrlMapping).toHaveBeenCalled();

    expect(component.apiHealth).toBe(mockHealthResponse);
  }));
});
