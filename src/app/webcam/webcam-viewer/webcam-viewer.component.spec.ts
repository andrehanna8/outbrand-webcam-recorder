import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamViewerComponent } from './webcam-viewer.component';

describe('WebcamViewerComponent', () => {
  let component: WebcamViewerComponent;
  let fixture: ComponentFixture<WebcamViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebcamViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebcamViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
