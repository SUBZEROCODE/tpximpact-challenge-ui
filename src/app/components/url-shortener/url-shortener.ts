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
  testAliasResponse: string = "";
  apiHealth: string = "";

  constructor(private urlShortener: UrlShortenerService) {}

  ngOnInit() {

    this.urlShortener.getHealthOfAPI().subscribe((healthStatus: string) => {
      console.log(healthStatus)
      this.apiHealth = healthStatus;

      this.urlShortener.getUrlRedirectForAlias().subscribe((result: string) => {
          this.testAliasResponse = result;
      });

    });

  }

}
