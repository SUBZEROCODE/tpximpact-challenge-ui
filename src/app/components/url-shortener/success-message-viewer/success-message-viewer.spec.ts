import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessMessageViewerComponent } from './success-message-viewer';

describe('SuccessMessageViewerComponent', () => {
  let component: SuccessMessageViewerComponent;
  let fixture: ComponentFixture<SuccessMessageViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessMessageViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessMessageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
