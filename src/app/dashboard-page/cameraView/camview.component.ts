import {Component, ViewChild, ElementRef} from '@angular/core'

/// https://x-team.com/blog/webcam-image-capture-angular/

@Component({
  // selector: 'dash-frame',
  selector: 'app-root',
  templateUrl: './camview.component.html',
  styleUrls: ['./camview.component.css']
})
export class CamView {

  @ViewChild("video", {static: false})
  public video: ElementRef;

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
