import { Component, OnInit, ViewChild } from '@angular/core';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { VideoComponent } from '@fav-components/video.component';
import { EafStore } from '@fav-stores/eaf-store';
import { KeyValue } from '@angular/common';
import { EafTier } from '@fav-models/eaf/tier';
import { OrderedValue } from '@fav-models/ordered-map';
import { EafAlignableAnnotation } from '@fav-models/eaf/alignable-annotation';
import { EafRefAnnotation } from '@fav-models/eaf/ref-annotation';
import { Eaf } from '@fav-models/eaf';
import { EafMedia } from '@fav-models/eaf/media';
import { SettingsStore } from '@fav-stores/settings-store';

@Component({
  selector: 'app-table-viewer',
  templateUrl: '../views/table-viewer.component.html',
  styleUrls: ['../styles/table-viewer.component.scss']
})
export class TableViewerComponent implements OnInit {

  @ViewChild('videoPlayer', { static: false }) videoPlayer: VideoComponent;

  showTimestamps: boolean = true;
  width: number           = 100;
  height: number          = 100;
  tier: EafTier           = null;
  eaf: Eaf                = null;
  mediaSource: EafMedia   = null;

  constructor(public eafStore: EafStore, public settingsStore: SettingsStore, private hotkeys: HotkeysService) {

    this.hotkeys.add(new Hotkey('p', (event: KeyboardEvent): boolean => {

      if (this.videoPlayer) {
        this.videoPlayer.play();
      }

      return false;
    }));

    this.hotkeys.add(new Hotkey('m', (event: KeyboardEvent): boolean => {

      if (this.videoPlayer) {
        this.videoPlayer.toggleMute();
      }

      return false;
    }));
  }

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

      if (data.action === 'initialize') {

        this.tier = data.tier;
        this.eaf  = data.eaf;

        if (this.eaf.header.media.first()) {
          this.mediaSource = this.eaf.header.media.first();
        }
      }

      if (data.action === 'set-tier') {
        this.tier = data.tier;
      }
    });
  }

  /**
   * Changing media
   *
   * @param mimetype string
   */
  changeMedia(event: Event) {

    let id     = (event.target as HTMLInputElement).value;
    let source = this.eaf.header.media.fetch(parseInt(id));

    if (null !== source) {
      this.mediaSource = source;
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

    if (this.videoPlayer) {
      this.videoPlayer.setPlayTime(time);
    }
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

    if (this.videoPlayer) {
      this.progressTracker(this.videoPlayer.getPlayTime());
    }
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

  getWidth() {

    return {
      width: this.width + '%',
    };
  }

  getHeight() {

    return {
      height: this.height + '%',
    };
  }

  dump(data) {
    console.log(data);
  }
}
