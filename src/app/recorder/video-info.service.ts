import { Injectable } from '@angular/core';
import { getDatabase, ref, push, child, set } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class VideoInfoService {
  constructor() {
    // Assuming Firebase has been initialized in your main.ts or another early-execution script
  }

  async saveVideoInfo(userId: string, videoUrl: string) {
    const db = getDatabase();
    const userVideosRef = ref(db, `users/${userId}/videos`);
    const newVideoRef = push(child(userVideosRef, 'videos'));
    await set(newVideoRef, { url: videoUrl, timestamp: Date.now() });
  }
}
