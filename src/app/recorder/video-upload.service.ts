import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration (same as provided)
const firebaseConfig = {
  apiKey: "AIzaSyC2PPhnPGd6fVPcPTy54aw9EP7U4GAYiq8",
  authDomain: "outbrand-webcam-recorder.firebaseapp.com",
  databaseURL: "https://outbrand-webcam-recorder-default-rtdb.firebaseio.com",
  projectId: "outbrand-webcam-recorder",
  storageBucket: "outbrand-webcam-recorder.appspot.com",
  messagingSenderId: "299484934627",
  appId: "1:299484934627:web:9ea7ffa5eef4ad8eb970d6",
  measurementId: "G-MMGVQMS66M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

@Injectable({
  providedIn: 'root'
})
export class VideoUploadService {
  async uploadVideo(file: Blob, filePath: string): Promise<string> {
    const storageRef = ref(storage, filePath);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }
}
