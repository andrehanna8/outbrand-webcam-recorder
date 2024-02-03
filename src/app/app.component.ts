import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoRecordingService } from './recorder/video-recording.service';
import { VideoUploadService } from './recorder/video-upload.service';
import { VideoInfoService } from './recorder/video-info.service';
import { VideoReviewComponent } from './recorder/video-review.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, VideoReviewComponent],
  template: `
    <div class="app-container" *ngIf="!recording">
      <button (click)="startRecording()">Start Recording</button>
    </div>
    <div *ngIf="recording">
      <video #videoElement autoplay muted></video>
      <button (click)="stopRecording()">Stop Recording</button>
    </div>
    <app-video-review *ngIf="videoURL" 
      [videoSrc]="videoURL" 
      (redo)="redoRecording()" 
      (confirm)="confirmRecording()">
    </app-video-review>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef;
  videoBlob: Blob | null = null;
  videoURL: string | null = null;
  recording = false;

  constructor(
    private videoRecordingService: VideoRecordingService,
    private videoUploadService: VideoUploadService,
    private videoInfoService: VideoInfoService
  ) {}

  ngOnInit(): void {}

  async startRecording() {
    try {
      const stream = await this.videoRecordingService.startRecording();
      this.videoElement.nativeElement.srcObject = stream;
      this.recording = true;
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }

  stopRecording() {
    this.videoRecordingService.stopRecording().then(blob => {
      this.videoBlob = blob;
      this.videoURL = URL.createObjectURL(blob);
      this.recording = false;
      // Reset the video element's srcObject to null after recording
      if (this.videoElement && this.videoElement.nativeElement) {
        this.videoElement.nativeElement.srcObject = null;
      }
    });
  }

  redoRecording() {
    this.videoURL = null;
    this.startRecording();
  }

  confirmRecording() {
    if (!this.videoBlob) return;
    this.videoUploadService.uploadVideo(this.videoBlob, 'filePath').then(downloadURL => {
      console.log('Video uploaded:', downloadURL);
      // Save video info to Firebase Realtime Database
      this.videoInfoService.saveVideoInfo('userId', downloadURL).then(() => {
        console.log('Video info saved successfully');
        // Reset the state or navigate the user elsewhere
        this.videoURL = null;
      });
    });
  }
}
