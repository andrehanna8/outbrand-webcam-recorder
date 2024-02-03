import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(this.app);

  constructor() { }
}
