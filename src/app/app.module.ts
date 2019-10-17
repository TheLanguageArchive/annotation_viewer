import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { HttpClientModule } from '@angular/common/http';

import { AnnotationViewerComponent } from '@fav-components/annotation-viewer.component';
import { TableViewerComponent } from '@fav-components/table-viewer.component';
import { MessagesComponent } from '@fav-components/messages.component';
import { VideoComponent } from '@fav-components/video.component';
import { ToplevelComponent } from '@fav-components/table-viewer/toplevel.component';
import { SymbolicSubdivisionComponent } from '@fav-components/table-viewer/symbolic-subdivision.component';
import { TimeSubdivisionComponent } from '@fav-components/table-viewer/time-subdivision.component';
import { SymbolicAssociationComponent } from '@fav-components/table-viewer/symbolic-association.component';
import { IncludedInComponent } from '@fav-components/table-viewer/included-in.component';
import { ApiUrlStore } from '@fav-stores/api-url-store';
import { ShowTimestampsStore } from '@fav-stores/show-timestamps-store';
import { EafStore } from '@fav-stores/eaf-store';

@NgModule({
  declarations: [
    AnnotationViewerComponent,
    TableViewerComponent,
    MessagesComponent,
    VideoComponent,
    ToplevelComponent,
    SymbolicSubdivisionComponent,
    SymbolicAssociationComponent,
    TimeSubdivisionComponent,
    IncludedInComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  entryComponents: [AnnotationViewerComponent],
  providers: [ApiUrlStore, ShowTimestampsStore, EafStore],
})
export class AppModule {

  constructor(private injector: Injector) {}

  ngDoBootstrap() {

    const viewerElement = createCustomElement(AnnotationViewerComponent, { injector: this.injector });
    customElements.define('annotation-viewer', viewerElement);
  }
}
