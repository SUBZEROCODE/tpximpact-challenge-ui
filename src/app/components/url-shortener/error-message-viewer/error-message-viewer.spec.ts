import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageViewerComponent } from './error-message-viewer';
import { HttpErrorResponse } from '@angular/common/http';

describe('ErrorMessageViewer', () => {
  let component: ErrorMessageViewerComponent;
  let fixture: ComponentFixture<ErrorMessageViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorMessageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when closeErrorMessage() is called, should set error message back to emptyString', () => {
      component.errorMessage = "URL not found"
      component.closeErrorMessage();
      fixture.detectChanges();
      expect(component.errorMessage).toEqual("")
  });

  it('when errorMessageHandler() is called with status 0, set error message that api is offline', ()=> {
    const apiUnhealthyText = 'Unable to connect to the API. The backend API may be offline or unreachable.';
    component.errorHandlerInput = new HttpErrorResponse({
      status: 0,
      statusText: 'Unknown Error',
      url: '/api/v1/url-shortener/health',
      error: { message: 'testErrorMessage' }
    });

    component.errorMessageHandler();
    expect(component.errorMessage).toEqual(apiUnhealthyText);
  });

  it('when errorMessageHandler() is called with another status e.g. 404, set error message to that given errorMessage', ()=> {
    component.errorHandlerInput = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
      url: `/api/v1/url-shortener/some-test-alias`,
      error: { message: 'Alias not found' }
    });

    component.errorMessageHandler();
    expect(component.errorMessage).toEqual('Alias not found');
  });

});
