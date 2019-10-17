import { OnInit } from '@angular/core';
import TimeFormat from 'hh-mm-ss';
import { EafStore } from '@fav-stores/eaf-store';
import { EafTimeslot } from '@fav-models/eaf/timeslot';
import { SettingsStore } from '@fav-stores/settings-store';

export class AbstractComponent implements OnInit {

  showTimestamps: boolean;
  constructor(public eafStore: EafStore, public settingsStore: SettingsStore) {}

  ngOnInit() {

    let settingsObserver = this.settingsStore.state$.subscribe((data) => {

      if (data.showTimestamps) {
        this.showTimestamps = data.showTimestamps as boolean;
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
