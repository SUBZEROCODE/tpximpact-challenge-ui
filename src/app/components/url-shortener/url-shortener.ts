import { Component, OnInit, inject } from '@angular/core';
import { UrlShortenerService } from '../../services/url-shortener-service';

@Component({
  selector: 'app-url-shortener',
  templateUrl: './url-shortener.html',
  styleUrl: './url-shortener.scss'
})
export class UrlShortenerComponent implements OnInit {
  private urlShortener = inject(UrlShortenerService);

  testAliasResponse: string = "";
  apiHealth: string = "";

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
