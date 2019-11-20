import { Component, Input, OnInit } from '@angular/core';
import TimeFormat from 'hh-mm-ss';
import { EafTier } from '@fav-models/eaf/tier';
import { EafStore } from '@fav-stores/eaf-store';
import { SettingsStore } from '@fav-stores/settings-store';
import { EafTimeslot } from '@fav/app/models/eaf/timeslot';

@Component({
  selector: 'app-symbolic-subdivision',
  templateUrl: '../../views/table-viewer/symbolic-subdivision.component.html',
  styleUrls: ['../../styles/table-viewer/symbolic-subdivision.component.scss']
})
export class SymbolicSubdivisionComponent implements OnInit {

  @Input() id: string;
  @Input() row: string;

  tier: EafTier;
  activeIds: string[];
  showTimestamps: boolean;

  constructor(public eafStore: EafStore, public settingsStore: SettingsStore) {}

  ngOnInit() {

    let settingsObserver = this.settingsStore.state$.subscribe((data) => {

      if (data.action === 'initialize') {
        this.showTimestamps = data.showTimestamps;
      }

      if (data.action === 'toggle-show-timestamps') {
        this.showTimestamps = data.showTimestamps;
      }
    });

    let eafObserver = this.eafStore.state$.subscribe((data) => {

      if (data.action === 'initialize') {

        this.tier      = data.tier;
        this.activeIds = data.activeIds;
      }

      if (data.action === 'set-tier') {

        this.tier      = data.tier;
        this.activeIds = data.activeIds;
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
