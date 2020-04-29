import {Component, ViewChild, ElementRef} from '@angular/core'
import { DroneService, DroneEventListener } from '../drone/drone.service';

/// https://x-team.com/blog/webcam-image-capture-angular/

@Component({
  // selector: 'dash-frame',
  selector: 'app-root',
  templateUrl: './camview.component.html',
  styleUrls: ['./camview.component.css']
})
export class CamView implements DroneEventListener {

  @ViewChild("video", {static: false})
  public video: ElementRef;

  constructor(private droneService: DroneService) {
    this.droneService.addEventListener(this)
  }

  onDroneEvent(event: any) {
    throw new Error("Method not implemented.");
  }

  public ngAfterViewInit() {
    console.log("After view init - talma")
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
              // this.video.nativeElement.src = window.URL.createObjectURL(stream);
              this.video.nativeElement.srcObject = stream
              this.video.nativeElement.play();
          });
      }
  }
}
