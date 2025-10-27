import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageViewerComponent } from './error-message-viewer';

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
});
