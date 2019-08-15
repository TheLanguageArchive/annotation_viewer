import { Component, Input } from '@angular/core';
import { AbstractComponent } from '@fav-components/table-viewer/abstract.component';

@Component({
  selector: 'app-toplevel',
  templateUrl: '../../views/table-viewer/toplevel.component.html',
  styleUrls: ['../../styles/table-viewer/toplevel.component.scss']
})
export class ToplevelComponent extends AbstractComponent {

  @Input() id: string;
  @Input() row: string;
}
