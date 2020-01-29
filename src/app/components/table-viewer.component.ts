import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { MediaPlayerComponent } from '@fav-components/media-player.component';
import { EafStore } from '@fav-stores/eaf-store';
import { KeyValue } from '@angular/common';
import { EafTier } from '@fav-models/eaf/tier';
import { OrderedValue } from '@fav-models/ordered-map';
import { Eaf } from '@fav-models/eaf';
import { EafMedia } from '@fav-models/eaf/media';
import { SettingsStore } from '@fav-stores/settings-store';
import { MediaStore } from '@fav-stores/media-store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-viewer',
  templateUrl: '../views/table-viewer.component.html',
  styleUrls: ['../styles/table-viewer.component.scss']
})
export class TableViewerComponent implements OnInit, OnDestroy {

  @ViewChild('mediaPlayer', { static: false }) mediaPlayer: MediaPlayerComponent;

  showTimestamps: boolean     = true;
  width: number               = 100;
  height: number              = 100;
  tier: EafTier               = null;
  eaf: Eaf                    = null;
  mediaSource: EafMedia       = null;
  subscriptions: Subscription = new Subscription();

  constructor(private eafStore: EafStore, private settingsStore: SettingsStore, private mediaStore: MediaStore) {
  }

  /**
   * NG On Init
   */
  ngOnInit() {

    this.subscriptions.add(this.settingsStore.state$.subscribe((data) => {

      if (data.action === 'initialize') {

        this.showTimestamps = data.showTimestamps;
        this.width = data.width;
        this.height = data.height;
      }

      if (data.action === 'set-width') {
        this.width = data.width;
      }

      if (data.action === 'set-height') {
        this.height = data.height;
      }

      if (data.action === 'toggle-show-timestamps') {
        this.showTimestamps = data.showTimestamps;
      }
    }));

    this.subscriptions.add(this.mediaStore.state$.subscribe((data) => {

      if (data.action === 'initialize') {
        this.mediaSource = data.media;
      }

      if (data.action === 'set-media') {
        this.mediaSource = data.media;
      }
    }));

    this.subscriptions.add(this.eafStore.state$.subscribe((data) => {

      if (data.action === 'initialize') {

        this.tier = data.tier;
        this.eaf  = data.eaf;

        if (this.eaf.header.media.first()) {
          this.mediaStore.buildInitialState(this.eaf.header.media.first());
        }
      }

      if (data.action === 'set-tier') {
        this.tier = data.tier;
      }
    }));
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
      this.mediaStore.setMedia(source);
    }
  }

  /**
   * MediaPlayerComponent sends this method the current time
   * so we can activate the appropriate annotations.
   *
   * @param currentTime
   */
  progressTracker(currentTime: number) {

    console.log(currentTime);
    let activeIds = [];
    this.tier.annotations.forEach(item => {

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
   * Changing tier and loading its annotation in the table
   * and activating the appropriate annotations at the current
   * media player time.
   *
   * @param event
   */
  changeTier(event: Event) {

    this.eafStore.setTier((event.target as HTMLInputElement).value);

    if (this.mediaPlayer) {
      this.progressTracker(this.mediaPlayer.getPlayTime());
    }
  }

  setPlayTime(time: number) {

    if (this.mediaPlayer) {
      this.mediaPlayer.setPlayTime(time);
    }
  }

  toggleShowTimestamps() {
    this.settingsStore.toggleShowTimestamps();
  }

  tierOrder(a: KeyValue<string, OrderedValue<EafTier>>, b: KeyValue<string, OrderedValue<EafTier>>): number {
    return b.value.rank > a.value.rank ? -1 : (a.value.rank > b.value.rank ? 1 : 0);
  }

  getMediaSourceOffset() {
    return `${Math.round(this.mediaSource.offset / 1000).toFixed(3)}s`;
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  dump(data) {
    console.log(data);
  }
}
