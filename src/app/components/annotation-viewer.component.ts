import { Component, OnInit, Input } from '@angular/core';
import { ApiUrlStore } from '@fav-stores/api-url-store';
import { EafStore } from '@fav-stores/eaf-store';

@Component({
  selector: 'annotation-viewer',
  templateUrl: '../views/annotation-viewer.component.html',
  styleUrls: ['../styles/annotation-viewer.component.scss']
})
export class AnnotationViewerComponent implements OnInit {

  title = 'Annotation Viewer';
  @Input('url') url: string;

  constructor(private apiUrlStore: ApiUrlStore, private eafStore: EafStore) {}

  ngOnInit() {

    this.apiUrlStore.setUrl(this.url);
    this.eafStore.buildInitialState();
  }
}
