import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamModule } from 'ngx-webcam';
import { WebcamViewerComponent } from './webcam-viewer/webcam-viewer.component'; // Adjust the path as needed


@NgModule({
  declarations: [
    WebcamViewerComponent
  ],
  imports: [
    CommonModule,
    WebcamModule
  ],
  exports: [
    // Export components that should be accessible outside this module
    WebcamViewerComponent,
    WebcamModule // Makes WebcamModule available to other modules importing WebcamModule
  ]
})
export class AppWebcamModule { }
