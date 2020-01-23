import { Component } from '@angular/core';
import { ToplevelComponent } from './toplevel.component';

@Component({
  selector: 'app-symbolic-association',
  templateUrl: '../../views/table-viewer/symbolic-association.component.html',
  styleUrls: ['../../styles/table-viewer/symbolic-association.component.scss']
})
export class SymbolicAssociationComponent extends ToplevelComponent {

  getAnnotations() {

    return super
      .getAnnotations()
      .map(annotation => {
        return annotation.type === 'ref' && annotation.ref !== null;
      });
  }
}
