import { Component } from '@angular/core';
import { UrlShortenerService } from '../../services/url-shortener-service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-url-shortener',
  imports: [JsonPipe],
  templateUrl: './url-shortener.html',
  styleUrl: './url-shortener.scss'
})
export class UrlShortener {
  testAliasResponse: String = "";
  apiHealth: String = "";

  constructor(private urlShortener: UrlShortenerService) {}

  ngOnInit() {

    this.urlShortener.getUrlRedirectForAlias().subscribe((result: String) => {
      this.testAliasResponse = result;
    });

  }

}
