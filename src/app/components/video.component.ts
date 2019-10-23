import { Component, EventEmitter, AfterViewInit, ViewChild, Input, Output, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: '../views/video.component.html',
  styleUrls: ['../styles/video.component.scss']
})
export class VideoComponent implements AfterViewInit {

  @ViewChild('videoPlayer', { static: true }) videoPlayer: ElementRef;
  @Input() url: string;
  @Input() mimetype: string;
  @Input() width: number;
  @Output() progress: EventEmitter<number> = new EventEmitter<number>();

  private progressTracker: any;
  private playListener: any;
  private stopListener: any;

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit() {

    this.playListener = this.renderer.listen(this.videoPlayer.nativeElement, 'play', () => {
      console.log('playing');
      this.startTrackingProgress();
    });

    this.stopListener = this.renderer.listen(this.videoPlayer.nativeElement, 'pause', () => {
      console.log('stopped');
      this.stopTrackingProgress();
    });

  }

  startTrackingProgress() {

    this.progressTracker = window.setInterval(() => {

      // html5 video element currentTime is in seconds
      // let's convert it to miliseconds and emit to progress listener
      this.progress.emit(this.videoPlayer.nativeElement.currentTime * 1000);
    }, 1);
  }

  stopTrackingProgress() {

    if (this.progressTracker) {
      window.clearInterval(this.progressTracker);
    }
  }

  setPlayTime(time: number) {

    // we use miliseconds but video player uses seconds
    // convert and set time
    console.log(time);
    console.log(this.videoPlayer.nativeElement.currentTime);
    this.videoPlayer.nativeElement.currentTime = (time / 1000);
  }

  getPlayTime() {

    // getting current playtime is in seconds
    // converting to miliseconds
    return this.videoPlayer.nativeElement.currentTime * 1000;
  }

  play() {

    if (this.videoPlayer.nativeElement.paused) {
      this.videoPlayer.nativeElement.play();
    } else {
      this.videoPlayer.nativeElement.pause();
    }
  }

  mute() {
    this.videoPlayer.nativeElement.muted = true;
  }

  unmute() {
    this.videoPlayer.nativeElement.muted = false;
  }

  toggleMute() {
    this.videoPlayer.nativeElement.muted = !this.videoPlayer.nativeElement.muted;
  }

  ngDestroy() {

    if (this.playListener) {
      this.playListener();
    }

    if (this.stopListener) {
      this.stopListener();
    }
  }
}
