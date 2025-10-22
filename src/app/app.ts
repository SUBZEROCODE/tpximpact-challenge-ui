import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UrlShortener } from "./components/url-shortener/url-shortener";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UrlShortener],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'url-shortener-ui';
}
