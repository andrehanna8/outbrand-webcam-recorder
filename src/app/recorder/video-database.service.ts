import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class VideoDatabaseService {
  constructor(private db: AngularFireDatabase) {}

  saveVideoData(userId: string, videoUrl: string) {
    const path = `users/${userId}/videos`;
    const videoObject = { url: videoUrl, timestamp: Date.now() };
    this.db.list(path).push(videoObject);
  }
}
