import { Injectable } from "@angular/core";
import { delay, of } from "rxjs";

export class MockUrlShortenerService {
  getHealthOfAPI() {
    return of('Java Spring is ready to serve the API').pipe(delay(1000));
  }
  getUrlRedirectForAlias() {
    return of('test');
  }
}