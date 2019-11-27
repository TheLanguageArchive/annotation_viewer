import { Component, EventEmitter, AfterViewInit, Output, ElementRef, Renderer2, OnInit, ViewChildren, QueryList } from '@angular/core';
import { EafMedia } from '@fav-models/eaf/media';
import { SettingsStore } from '@fav-stores/settings-store';
import { MediaStore } from '@fav-stores/media-store';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: '../views/media-player.component.html',
  styleUrls: ['../styles/media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit, AfterViewInit {

  @ViewChildren('player') player: QueryList<ElementRef>;

  @Output() progress: EventEmitter<number> = new EventEmitter<number>();

  media: EafMedia = null;
  width: number;

  private progressTracker: any;
  private playListener: any;
  private stopListener: any;

  subscriptions: Subscription = new Subscription();

  constructor(private renderer: Renderer2, private settingsStore: SettingsStore, private mediaStore: MediaStore, private hotkeys: HotkeysService) {
  }

  ngOnInit() {

    this.subscriptions.add(this.settingsStore.state$.subscribe((data) => {

      if (data.action === 'initialize') {
        this.width = data.width;
      }

      if (data.action === 'set-width') {
        this.width = data.width;
      }
    }));

    this.subscriptions.add(this.mediaStore.state$.subscribe((data) => {

      if (data.action === 'initialize') {
        this.media = data.media;
      }

      if (data.action === 'set-media') {

        this.media = data.media;
        this.setUp();
      }
    }));
  }

  ngAfterViewInit() {
    this.setUp();
  }

  setUp() {

    this.bindListeners();
    this.bindKeys();
  }

  cleanUp() {

    this.clearListeners();
    this.stopTrackingProgress();
  }

  clearListeners() {

    if (this.playListener) {
      this.playListener();
    }

    if (this.stopListener) {
      this.stopListener();
    }
  }

  bindListeners() {

    // first cleaning everything
    this.cleanUp();

    if (this.player.length === 0) {
      return;
    }

    // then loading player with new source and setting offset
    this.player.first.nativeElement.load();
    this.player.first.nativeElement.currentTime = this.media.offset / 1000;

    // then binding listeners
    this.playListener = this.renderer.listen(this.player.first.nativeElement, 'play', () => {
      this.startTrackingProgress();
    });

    this.stopListener = this.renderer.listen(this.player.first.nativeElement, 'pause', () => {
      this.stopTrackingProgress();
    });
  }

  bindKeys() {

    this.hotkeys.reset();
    this.hotkeys.add(new Hotkey('p', (event: KeyboardEvent): boolean => {

      this.play();
      return false;
    }));

    this.hotkeys.add(new Hotkey('m', (event: KeyboardEvent): boolean => {

      this.toggleMute();
      return false;
    }));
  }

  startTrackingProgress() {

    if (this.player.length === 0) {

      this.cleanUp();
      return;
    }

    let emitter = () => {

      // html5 video/audio element currentTime is in seconds
      // let's convert it to miliseconds and emit to progress listener
      let time = this.player.first.nativeElement.currentTime * 1000;
      console.log(time);

      this.progress.emit(time);

      // and use 60 fps animation framerate from browser
      this.progressTracker = window.requestAnimationFrame(emitter);
    };

    // starting progress tracker
    this.progressTracker = window.requestAnimationFrame(emitter);
  }

  stopTrackingProgress() {

    if (this.progressTracker) {
      window.cancelAnimationFrame(this.progressTracker);
    }
  }

  setPlayTime(time: number) {

    if (this.player.length === 0) {

      this.cleanUp();
      return;
    }

    // we use miliseconds but video/audio player uses seconds
    // convert and set time
    this.player.first.nativeElement.currentTime = (time / 1000);
  }

  getPlayTime() {

    if (this.player.length === 0) {

      this.cleanUp();
      return;
    }

    // getting current playtime is in seconds
    // converting to miliseconds
    return this.player.first.nativeElement.currentTime * 1000;
  }

  play() {

    if (this.player.length === 0) {

      this.cleanUp();
      return;
    }

    if (this.player.first.nativeElement.paused) {
      this.player.first.nativeElement.play();
    } else {
      this.player.first.nativeElement.pause();
    }
  }

  mute() {

    if (this.player.length === 0) {

      this.cleanUp();
      return;
    }

    this.player.first.nativeElement.muted = true;
  }

  unmute() {

    if (this.player.length === 0) {

      this.cleanUp();
      return;
    }

    this.player.first.nativeElement.muted = false;
  }

  toggleMute() {

    if (this.player.length === 0) {

      this.cleanUp();
      return;
    }

    this.player.first.nativeElement.muted = !this.player.first.nativeElement.muted;
  }

  ngDestroy() {

    this.cleanUp();
    this.subscriptions.unsubscribe();
    this.hotkeys.reset();
  }

  dump(data) {
    console.log(data);
  }
}
