import { OnInit } from '@angular/core';
import TimeFormat from 'hh-mm-ss';
import { EafStore } from '@fav-stores/eaf-store';
import { EafTimeslot } from '@fav-models/eaf/timeslot';
import { SettingsStore } from '@fav-stores/settings-store';
import { EafTier } from '@fav/app/models/eaf/tier';

export class AbstractComponent implements OnInit {

  tier: EafTier;
  activeIds: string[];
  showTimestamps: boolean;

  constructor(public eafStore: EafStore, public settingsStore: SettingsStore) {}

  ngOnInit() {

    let settingsObserver = this.settingsStore.state$.subscribe((data) => {

      if (data.showTimestamps) {
        this.showTimestamps = data.showTimestamps as boolean;
      }
    });

    let eafObserver = this.eafStore.state$.subscribe((data) => {

      if (data.action === 'initialize') {

        this.tier      = data.tier;
        this.activeIds = data.activeIds;
      }

      if (data.action === 'set-tier') {
        this.tier = data.tier;
      }

      if (data.action === 'activate-annotations') {
        this.activeIds = data.activeIds;
      }
    });
  }

  /**
   * Formatting duration of an annotation
   *
   * @param duration
   */
  formatDuration(duration: number) {
    return TimeFormat.fromMs(duration, 'hh:mm:ss.sss');
  }

  getDuration(start: EafTimeslot, end: EafTimeslot) {

      if (start.time > end.time) {
          return start.time - end.time;
      } else {
          return end.time - start.time;
      }
  }

  debug() {
    Array.from(arguments).forEach(argument => {
      console.log(argument);
    });
  }
}
