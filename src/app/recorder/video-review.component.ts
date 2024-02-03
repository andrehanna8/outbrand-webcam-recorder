import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule if you're using common directives like *ngIf, *ngFor, etc.

@Component({
  selector: 'app-video-review',
  standalone: true, // Mark the component as standalone
  imports: [CommonModule], // Import CommonModule here if needed
  template: `
    <!-- Your existing template code -->
    <div *ngIf="videoSrc">
      <video controls [src]="videoSrc"></video>
      <button (click)="redo.emit()">Redo</button>
      <button (click)="confirm.emit()">Confirm</button>
    </div>
  `,
  styleUrls: ['./video-review.component.css'],
})
export class VideoReviewComponent {
  @Input() videoSrc: string | null = null;
  @Output() redo = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
}
