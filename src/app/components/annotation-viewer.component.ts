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
  @Input('url') url: string;
  @Input('show-timestamps') showTimestamps: string;
  @Input('width') width: string;
  @Input('height') height: string;

  constructor(private settingsStore: SettingsStore, private eafStore: EafStore) {}

  ngOnInit() {

    this.settingsStore.setUrl(this.url);
    this.settingsStore.setShowTimestamps(this.showTimestamps == 'true');

    if (this.width) {
      this.settingsStore.setWidth(+this.width);
    }

    if (this.height) {
      this.settingsStore.setHeight(+this.height);
    }

    this.eafStore.buildInitialState();
  }
}
