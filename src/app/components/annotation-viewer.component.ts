import { Component, OnInit, Input } from '@angular/core';
import { SettingsStore } from '@fav-stores/settings-store';
import { EafStore } from '@fav-stores/eaf-store';

@Component({
  selector: 'annotation-viewer',
  templateUrl: '../views/annotation-viewer.component.html',
  styleUrls: ['../styles/annotation-viewer.component.scss']
})
export class AnnotationViewerComponent implements OnInit {

  title = 'Annotation Viewer';

  @Input() url: string                             = '';
  @Input() width: string                           = '100';
  @Input() height: string                          = '100';
  @Input('show-timestamps') showTimestamps: string = 'false';

  constructor(private settingsStore: SettingsStore, private eafStore: EafStore) {
  }

  ngOnInit() {

    let width: number = +this.width;
    if (true === isNaN(width)) {
      width = 100;
    }

    let height: number = +this.height;
    if (true === isNaN(height)) {
      height = 100;
    }

    this.settingsStore.buildInitialState(this.url, width, height, this.showTimestamps == 'true');
    this.eafStore.buildInitialState();
  }
}
