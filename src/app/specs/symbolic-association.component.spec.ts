import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SymbolicAssociationComponent } from '@fav-components/table-viewer/symbolic-association.component';

describe('SymbolicAssociationComponent', () => {
  let component: SymbolicAssociationComponent;
  let fixture: ComponentFixture<SymbolicAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolicAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolicAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
