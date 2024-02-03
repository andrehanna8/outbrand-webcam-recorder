import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebcamService {
  async getVideoStream(): Promise<MediaStream> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      return stream;
    } catch (err) {
      console.error('Error accessing the webcam', err);
      throw err;
    }
  }
}
