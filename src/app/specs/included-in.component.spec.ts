import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IncludedInComponent } from '@fav-components/table-viewer/included-in.component';

describe('IncludedInComponent', () => {
  let component: IncludedInComponent;
  let fixture: ComponentFixture<IncludedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncludedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncludedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
