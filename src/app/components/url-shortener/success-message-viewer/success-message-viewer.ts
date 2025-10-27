import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-success-message-viewer',
  imports: [CommonModule],
  templateUrl: './success-message-viewer.html',
  styleUrl: './success-message-viewer.scss',
})
export class SuccessMessageViewerComponent implements OnChanges {
  @Input() successMessage: string = "";

  ngOnChanges(): void {
    if (this.hasSuccessMessage) {
      setTimeout(() => this.closeSuccessMessage(), 5000);
    }
  }

  get hasSuccessMessage(): boolean {
    return this.successMessage !== "";
  }
  
  closeSuccessMessage() {
    this.successMessage = "";
  }
}
