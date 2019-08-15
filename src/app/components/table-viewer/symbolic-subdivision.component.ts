import { Component, Input } from '@angular/core';
import { AbstractComponent } from '@fav-components/table-viewer/abstract.component';

@Component({
  selector: 'app-symbolic-subdivision',
  templateUrl: '../../views/table-viewer/symbolic-subdivision.component.html',
  styleUrls: ['../../styles/table-viewer/symbolic-subdivision.component.scss']
})
export class SymbolicSubdivisionComponent extends AbstractComponent {

  @Input() id: string;
  @Input() row: string;
}
