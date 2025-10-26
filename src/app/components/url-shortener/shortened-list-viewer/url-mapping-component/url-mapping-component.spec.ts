import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlMappingComponent } from './url-mapping-component';
import { provideHttpClient } from '@angular/common/http';

describe('UrlMappingComponent', () => {
  let component: UrlMappingComponent;
  let fixture: ComponentFixture<UrlMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrlMappingComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrlMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
