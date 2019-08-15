import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'annotation-viewer',
  templateUrl: '../views/annotation-viewer.component.html',
  styleUrls: ['../styles/annotation-viewer.component.scss']
})
export class AnnotationViewerComponent implements OnInit {

  title = 'Annotation Viewer';
  constructor() { }

  ngOnInit() {
  }

}
