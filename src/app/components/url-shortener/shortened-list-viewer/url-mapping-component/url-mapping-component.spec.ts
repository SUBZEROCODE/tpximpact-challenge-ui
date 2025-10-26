import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlMappingComponent } from './url-mapping-component';

describe('UrlMappingComponent', () => {
  let component: UrlMappingComponent;
  let fixture: ComponentFixture<UrlMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrlMappingComponent]
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
