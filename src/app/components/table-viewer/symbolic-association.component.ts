import { Component } from '@angular/core';
import { SymbolicSubdivisionComponent } from '@fav-components/table-viewer/symbolic-subdivision.component';

@Component({
  selector: 'app-symbolic-association',
  templateUrl: '../../views/table-viewer/symbolic-subdivision.component.html',
  styleUrls: ['../../styles/table-viewer/symbolic-subdivision.component.scss']
})
export class SymbolicAssociationComponent extends SymbolicSubdivisionComponent {}
