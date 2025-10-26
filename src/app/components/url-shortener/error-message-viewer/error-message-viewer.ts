import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-error-message-viewer',
  imports: [CommonModule],
  templateUrl: './error-message-viewer.html',
  styleUrl: './error-message-viewer.scss',
})
export class ErrorMessageViewerComponent implements OnChanges {
  @Input() errorHandlerInput?: HttpErrorResponse;
  errorMessage = "";

  get hasErrorMessage(): boolean {
    return this.errorMessage !== "";
  }

  ngOnChanges(): void {
      this.errorMessageHandler();
  }

  // Centralized error handler
  errorMessageHandler() {
    if(this.errorHandlerInput){
      if (this.errorHandlerInput.status === 0) {
        this.errorMessage = "Unable to connect to the API. The backend API may be offline or unreachable."
      } else {
          this.errorMessage = this.errorHandlerInput.error?.message || this.errorHandlerInput.error
      }
    }

    // Auto-dismiss after 5 seconds
    // eslint-disable-next-line no-undef
    setTimeout(() => this.closeErrorMessage(), 10000);
  }

  closeErrorMessage() {
    this.errorMessage = "";
  }
}
