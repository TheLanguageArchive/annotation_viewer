import { Component, OnInit, Input } from '@angular/core';
import { IdStore } from '@fav-stores/id-store';
import { EafStore } from '@fav-stores/eaf-store';

@Component({
  selector: 'annotation-viewer',
  templateUrl: '../views/annotation-viewer.component.html',
  styleUrls: ['../styles/annotation-viewer.component.scss']
})
export class AnnotationViewerComponent implements OnInit {

  title = 'Annotation Viewer';
  @Input('id') id: string;

  constructor(private idStore: IdStore, private eafStore: EafStore) {}

  ngOnInit() {

    this.idStore.setId(this.id);
    this.eafStore.buildInitialState();
  }
}
