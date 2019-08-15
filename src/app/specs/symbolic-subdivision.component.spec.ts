import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SymbolicSubdivisionComponent } from './symbolic-subdivision.component';

describe('SymbolicSubdivisionComponent', () => {
  let component: SymbolicSubdivisionComponent;
  let fixture: ComponentFixture<SymbolicSubdivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolicSubdivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolicSubdivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
