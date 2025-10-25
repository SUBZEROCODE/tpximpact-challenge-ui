import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message-viewer',
  imports: [CommonModule],
  templateUrl: './error-message-viewer.html',
  styleUrl: './error-message-viewer.scss',
})
export class ErrorMessageViewerComponent {
  @Input() errorHandlerInput?: HttpErrorResponse;
  errorMessage = "";

  // Centralized error handler
  errorMessageHandler() {
    if(this.errorHandlerInput){
      this.errorMessage = this.errorHandlerInput.error?.message || this.errorHandlerInput.statusText
    }

    // Auto-dismiss after 5 seconds
    // eslint-disable-next-line no-undef
    setTimeout(() => this.closeErrorMessage(), 5000);
  }

  closeErrorMessage() {
    this.errorMessage = "";
  }
}
