import { Injectable } from "@angular/core";
import { of } from "rxjs";

export class MockUrlShortenerService {
  getHealthOfAPI() {
    return of('Java Spring is ready to serve the API');
  }
  getUrlRedirectForAlias() {
    return of('test');
  }
}