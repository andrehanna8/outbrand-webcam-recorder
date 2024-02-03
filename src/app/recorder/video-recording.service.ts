import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VideoRecordingService {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  async startRecording() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };
      this.mediaRecorder.start(10); // For every 10ms of data
      return this.stream;
    } else {
      throw new Error('User Media not supported');
    }
  }

  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject('No MediaRecorder instance');
        return;
      }
      this.mediaRecorder.onstop = () => {
        const videoBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
        this.cleanUp();
        resolve(videoBlob);
      };
      this.mediaRecorder.stop();
    });
  }

  private cleanUp() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.mediaRecorder = null;
    this.recordedChunks = [];
  }
}
