import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortenedListViewerComponent } from './shortened-list-viewer';
import { HttpErrorResponse, HttpResponse, provideHttpClient } from '@angular/common/http';
import { UrlShortenerService } from '../../../services/url-shortener-service';
import { of, throwError } from 'rxjs';

describe('ShortenedListViewer', () => {
  let component: ShortenedListViewerComponent;
  let fixture: ComponentFixture<ShortenedListViewerComponent>;
  let urlShortenerService: UrlShortenerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortenedListViewerComponent],
      providers: [provideHttpClient()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortenedListViewerComponent);
    component = fixture.componentInstance;
    urlShortenerService = TestBed.inject(UrlShortenerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit successMessage when deletion succeeds with status 204', () => {
    const alias = 'test-alias';
    const mockResponse = new HttpResponse({ status: 204, body: 'Deleted successfully' });
    spyOn(urlShortenerService, 'deleteShortenedUrlMapping').and.returnValue(of(mockResponse));
    spyOn(component.successMessage, 'emit');
    spyOn(component.errorToHandle, 'emit');

    component.deleteShortenedUrl(alias);

    expect(urlShortenerService.deleteShortenedUrlMapping).toHaveBeenCalledWith(alias);
    expect(component.successMessage.emit).toHaveBeenCalledWith('Successfully deleted');
    expect(component.errorToHandle.emit).not.toHaveBeenCalled();
  });

  it('should emit errorToHandle when deletion fails', () => {
    const alias = 'test-alias';
    const mockError = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
      url: `/api/v1/url-shortener/${alias}`,
      error: { message: 'Alias not found' }
    });

    spyOn(urlShortenerService, 'deleteShortenedUrlMapping').and.returnValue(throwError(() => mockError));
    spyOn(component.successMessage, 'emit');
    spyOn(component.errorToHandle, 'emit');

    component.deleteShortenedUrl(alias);

    expect(urlShortenerService.deleteShortenedUrlMapping).toHaveBeenCalledWith(alias);
    expect(component.errorToHandle.emit).toHaveBeenCalledWith(mockError);
    expect(component.successMessage.emit).not.toHaveBeenCalled();
  });



});
