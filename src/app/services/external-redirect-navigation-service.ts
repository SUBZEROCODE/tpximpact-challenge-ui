import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

// Added for managing external interactions, passing headers etc to future microservices.
// Its important that the redirect is testable also within our code as this is a key behaviour.
export class ExternalRedirectNavigationService {
  manageWindowRedirect(url: string) {
    window.location.href = url;
  }
}