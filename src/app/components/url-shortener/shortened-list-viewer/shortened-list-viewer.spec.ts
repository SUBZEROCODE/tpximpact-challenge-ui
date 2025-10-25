import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortenedListViewerComponent } from './shortened-list-viewer';

describe('ShortenedListViewer', () => {
  let component: ShortenedListViewerComponent;
  let fixture: ComponentFixture<ShortenedListViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortenedListViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortenedListViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
