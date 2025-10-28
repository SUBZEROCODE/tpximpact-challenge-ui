import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { UrlMappingEventsService } from '../../../../services/url-mapping-events-service';
import { UrlShortenerService } from '../../../../services/url-shortener-service';
import { MockUrlShortenerService } from '../../../../testing/mocks/mock-url-shortener-service';
import { UrlMappingComponent } from './url-mapping-component';

describe('UrlMappingComponent', () => {
  let component: UrlMappingComponent;
  let fixture: ComponentFixture<UrlMappingComponent>;
  let mockUrlShortenerService: MockUrlShortenerService;
  const mockUrlMappingEventsService = {
    emitSuccess: jasmine.createSpy('emitSuccess'),
    emitError: jasmine.createSpy('emitError')
  };  

    beforeEach(async () => {
      mockUrlShortenerService = new MockUrlShortenerService();
      await TestBed.configureTestingModule({
        imports: [UrlMappingComponent],
        providers: [
          provideHttpClient(),
          { provide: UrlShortenerService, useValue: mockUrlShortenerService},
          { provide: UrlMappingEventsService, useValue: mockUrlMappingEventsService}
        ],
      }).compileComponents();
  
      fixture = TestBed.createComponent(UrlMappingComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should alert if alias or full URL is missing', () => {
    const windowSpy = spyOn(window, 'alert');
    component.fullUrlGiven = '';
    fixture.detectChanges();
    component.addNewUrlMapping();
    expect(windowSpy).toHaveBeenCalledWith('Please enter a full URL to save');
  });

  it('should emit success message on successful save', () => {
    const successMessage = 'URL successfully shortened';
    spyOn(mockUrlShortenerService, 'saveAliasedShortenedUrlMapping').and.callThrough();

    component.aliasGiven = 'my-mock-alias';
    component.fullUrlGiven = 'https://example.com/some/long/rul';
    component.addNewUrlMapping();

    expect(mockUrlMappingEventsService.emitSuccess).toHaveBeenCalledWith(successMessage);
  });

});
