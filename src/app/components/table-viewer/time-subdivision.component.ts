import { Component, Input } from '@angular/core';
import { AbstractComponent } from '@fav-components/table-viewer/abstract.component';

@Component({
  selector: 'app-time-subdivision',
  templateUrl: '../../views/table-viewer/time-subdivision.component.html',
  styleUrls: ['../../styles/table-viewer/time-subdivision.component.scss']
})
export class TimeSubdivisionComponent extends AbstractComponent {

  @Input() id: string;
  @Input() row: string;
}
