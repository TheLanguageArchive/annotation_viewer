import { Component, OnInit, ViewChild } from '@angular/core';
import TimeFormat from 'hh-mm-ss';
import { VideoComponent } from '@fav-components/video.component';
import { EafStore } from '@fav-stores/eaf-store';
import { KeyValue } from '@angular/common';
import { EafTier } from '@fav-models/eaf/tier';
import { OrderedValue } from '@fav-models/ordered-map';
import { EafAlignableAnnotation } from '@fav-models/eaf/alignable-annotation';
import { EafRefAnnotation } from '@fav-models/eaf/ref-annotation';
import { EafMedia } from '@fav-models/eaf/media';
import { SettingsStore } from '@fav-stores/settings-store';

@Component({
  selector: 'app-table-viewer',
  templateUrl: '../views/table-viewer.component.html',
  styleUrls: ['../styles/table-viewer.component.scss']
})
export class TableViewerComponent implements OnInit {

  @ViewChild('videoPlayer', { static: false }) videoPlayer: VideoComponent;

  width: number = 100;
  height: number = 100;
  showTimestamps: boolean;

  video: EafMedia;
  audio: EafMedia;
  mediaSource: EafMedia;

  constructor(public eafStore: EafStore, public settingsStore: SettingsStore) {}

  /**
   * NG On Init
   */
  ngOnInit() {

    let settingsObserver = this.settingsStore.state$.subscribe((data) => {

      if (data.showTimestamps) {
        this.showTimestamps = data.showTimestamps;
      }

      if (data.width) {
        this.width = data.width;
      }

      if (data.height) {
        this.height = data.height;
      }
    });

    let eafObserver = this.eafStore.state$.subscribe((data) => {

      if (data.eaf) {

        this.video = data.eaf.header.video;
        this.audio = data.eaf.header.audio;

        if (this.video) {
          this.mediaSource = this.video;
        } else if (this.audio) {
          this.mediaSource = this.audio;
        }

        eafObserver.unsubscribe();
      }
    });
  }

  /**
   * Changing media
   *
   * @param mimetype string
   */
  changeMedia(event: Event) {

    let mimetype = (event.target as HTMLInputElement).value;

    if (mimetype === 'video/mp4') {
      this.mediaSource = this.video;
    }

    if (mimetype === 'audio/x-wav') {
      this.mediaSource = this.audio;
    }
  }

  /**
   * Video Component sends this method the current time
   * so we can activate the appropriate annotations.
   *
   * @param currentTime
   */
  progressTracker(currentTime: number) {

    let activeIds = [];
    this.eafStore.state.tier.annotations.forEach(item => {

      let annotation = item.value;

      if (annotation.type === 'ref') {

        if (annotation.custom_start == null) {

          // ref annotation without custom start/end times
          // get start/end from referenced annotation
          if (currentTime >= annotation.referenced_annotation.start.time && currentTime <= annotation.referenced_annotation.end.time) {
            activeIds.push(annotation.id);
          }
        }

        if (annotation.custom_start != null) {

          // ref annotation with custom start/end times
          if (currentTime >= annotation.custom_start.time && currentTime <= annotation.custom_end.time) {
            activeIds.push(annotation.id);
          }
        }
      }

      if (annotation.type === 'alignable') {

        if (annotation.custom_start == null) {

          // alignable annotation without custom time
          if (currentTime >= annotation.start.time && currentTime <= annotation.end.time) {
            activeIds.push(annotation.id);
          }
        }

        if (annotation.custom_start != null) {

          // alignable annotation with custom time
          if (currentTime >= annotation.custom_start.time && currentTime <= annotation.custom_end.time) {
            activeIds.push(annotation.id);
          }
        }
      }
    });

    this.eafStore.activateAnnotations(activeIds);
  }

  /**
   * This method allows you to activate an annotation.
   * It also sets the video player at the correct time.
   *
   * @param annotationId
   */
  activateAnnotation(annotationId: string) {

    this.eafStore.activateAnnotations([annotationId]);

    let annotation = this.eafStore.state.tier.annotations.get(annotationId);
    let time       = 0;

    if (annotation.type === 'ref') {

      annotation = annotation as EafRefAnnotation;

      if (annotation.custom_start != null) {
          time = annotation.custom_start.time;
      }

      if (annotation.custom_start == null) {
          time = annotation.referenced_annotation.start.time;
      }
    }

    if (annotation.type === 'alignable') {

      annotation = annotation as EafAlignableAnnotation;

      if (annotation.custom_start != null) {
        time = annotation.custom_start.time;
      }

      if (annotation.custom_start == null) {
        time = annotation.start.time;
      }
    }

    this.videoPlayer.setPlayTime(time);
  }

  /**
   * Changing tier and loading its annotation in the table
   * and activating the appropriate annotations at the current
   * video player time.
   *
   * @param event
   */
  changeTier(event: Event) {

    this.eafStore.setTier((event.target as HTMLInputElement).value);
    this.progressTracker(this.videoPlayer.getPlayTime());
  }

  tierOrder(a: KeyValue<string, OrderedValue<EafTier>>, b: KeyValue<string, OrderedValue<EafTier>>): number {
    return b.value.rank > a.value.rank ? -1 : (a.value.rank > b.value.rank ? 1 : 0);
  }

  annotationOrder(a: KeyValue<string, OrderedValue<EafAlignableAnnotation | EafRefAnnotation>>, b: KeyValue<string, OrderedValue<EafAlignableAnnotation | EafRefAnnotation>>): number {
    return b.value.rank > a.value.rank ? -1 : (a.value.rank > b.value.rank ? 1 : 0);
  }

  getDimensions() {

    return {

      width: this.width + '%',
      height: this.height + '%'
    };
  }

  dump(data) {
    console.log(data);
  }
}
