import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeSubdivisionComponent } from './time-subdivision.component';

describe('TimeSubdivisionComponent', () => {
  let component: TimeSubdivisionComponent;
  let fixture: ComponentFixture<TimeSubdivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSubdivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSubdivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
