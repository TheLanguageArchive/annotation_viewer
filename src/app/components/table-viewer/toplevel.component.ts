import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import TimeFormat from 'hh-mm-ss';
import { EafTier } from '@fav-models/eaf/tier';
import { EafStore } from '@fav-stores/eaf-store';
import { SettingsStore } from '@fav-stores/settings-store';
import { Subscription } from 'rxjs';
import { EafRefAnnotation } from '@fav/app/models/eaf/ref-annotation';
import { EafAlignableAnnotation } from '@fav/app/models/eaf/alignable-annotation';
import { KeyValue, KeyValuePipe } from '@angular/common';
import { OrderedValue } from '@fav/app/models/ordered-map';

@Component({
  selector: 'app-toplevel',
  templateUrl: '../../views/table-viewer/toplevel.component.html',
  styleUrls: ['../../styles/table-viewer/toplevel.component.scss']
})
export class ToplevelComponent implements OnInit, OnDestroy {

  @Output() annotationActivated = new EventEmitter<number>();

  tier: EafTier;
  activeIds: string[];
  showTimestamps: boolean;

  width: number               = 100;
  subscriptions: Subscription = new Subscription();

  constructor(public eafStore: EafStore, public settingsStore: SettingsStore, private keyValuePipe: KeyValuePipe) {}

  ngOnInit() {

    this.subscriptions.add(this.settingsStore.state$.subscribe((data) => {

      if (data.action === 'initialize') {

        this.width          = data.width;
        this.showTimestamps = data.showTimestamps;
      }

      if (data.action === 'toggle-show-timestamps') {
        this.showTimestamps = data.showTimestamps;
      }

      if (data.action === 'set-width') {
        this.width = data.width;
      }
    }));

    this.subscriptions.add(this.eafStore.state$.subscribe((data) => {

      if (data.action === 'initialize') {

        this.tier      = data.tier;
        this.activeIds = data.activeIds;
      }

      if (data.action === 'set-tier') {

        this.tier      = data.tier;
        this.activeIds = data.activeIds;
      }

      if (data.action === 'activate-annotations') {

        this.tier      = data.tier;
        this.activeIds = data.activeIds;
      }
    }));
  }

  /**
   * Formatting duration of an annotation
   *
   * @param duration
   */
  formatDuration(duration: number) {
    return TimeFormat.fromMs(duration, 'hh:mm:ss.sss');
  }

  getDuration(start: number, end: number) {

      if (start > end) {
          return start - end;
      } else {
          return end - start;
      }
  }

  isRefAnnotation(annotation: EafRefAnnotation | EafAlignableAnnotation): annotation is EafRefAnnotation {
    return (annotation as EafRefAnnotation).type === 'ref';
  }

  isAlignableAnnotation(annotation: EafRefAnnotation | EafAlignableAnnotation): annotation is EafAlignableAnnotation {
    return (annotation as EafAlignableAnnotation).type === 'alignable';
  }

  showStartTime(annotation: EafRefAnnotation | EafAlignableAnnotation) {

    if (this.isRefAnnotation(annotation) && annotation.ref !== null && annotation.custom_start !== null) {
      return this.formatDuration(annotation.custom_start);
    }

    if (this.isAlignableAnnotation(annotation) && annotation.start !== null) {
      return this.formatDuration(annotation.start);
    }

    return '';
  }

  showEndTime(annotation: EafRefAnnotation | EafAlignableAnnotation) {

    if (this.isRefAnnotation(annotation) && annotation.ref !== null && annotation.custom_end !== null) {
      return this.formatDuration(annotation.custom_end);
    }

    if (this.isAlignableAnnotation(annotation) && annotation.end !== null) {
      return this.formatDuration(annotation.end);
    }
  }

  showDurationTime(annotation: EafRefAnnotation | EafAlignableAnnotation) {

    if (this.isRefAnnotation(annotation) && annotation.ref !== null && annotation.custom_start !== null && annotation.custom_end !== null) {

      return this.formatDuration(
        this.getDuration(annotation.custom_start, annotation.custom_end)
      );
    }

    if (this.isAlignableAnnotation(annotation) && annotation.custom_start !== null && annotation.custom_end !== null) {

      return this.formatDuration(
        this.getDuration(annotation.custom_start, annotation.custom_end)
      );
    }

    if (this.isAlignableAnnotation(annotation) && annotation.custom_start === null && annotation.start !== null && annotation.end !== null) {

      return this.formatDuration(
        this.getDuration(annotation.start, annotation.end)
      );
    }
  }

  getWidth() {

    return {
      width: this.width + '%',
    };
  }

  /**
   * This method allows you to activate an annotation.
   * It also sets the media player at the correct time.
   *
   * @param annotationId
   */
  activateAnnotation(annotationId: string) {

    this.eafStore.activateAnnotations([annotationId]);

    let annotation = this.eafStore.state.tier.annotations.get(annotationId);
    let time       = 0;

    if (this.isRefAnnotation(annotation)) {

      if (annotation.custom_start != null) {
          time = annotation.custom_start;
      }

      if (annotation.custom_start == null) {
          time = annotation.referenced_annotation.start;
      }
    }

    if (this.isAlignableAnnotation(annotation)) {

      if (annotation.custom_start != null) {
        time = annotation.custom_start;
      }

      if (annotation.custom_start == null) {
        time = annotation.start;
      }
    }

    this.annotationActivated.emit(time);
  }

  annotationOrder(a: KeyValue<string, OrderedValue<EafAlignableAnnotation | EafRefAnnotation>>, b: KeyValue<string, OrderedValue<EafAlignableAnnotation | EafRefAnnotation>>): number {
    return b.value.rank > a.value.rank ? -1 : (a.value.rank > b.value.rank ? 1 : 0);
  }

  getAnnotations() {

    return this.keyValuePipe
      .transform(this.tier.annotations)
      .sort(this.annotationOrder)
      .map(item => {
        return item.value.value;
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  debug() {
    Array.from(arguments).forEach(argument => {
      console.log(argument);
    });
  }
}
