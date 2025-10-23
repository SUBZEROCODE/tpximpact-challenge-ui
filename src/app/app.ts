/* eslint-disable @angular-eslint/component-class-suffix */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UrlShortenerComponent } from "./components/url-shortener/url-shortener";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UrlShortenerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'url-shortener-ui';
}
