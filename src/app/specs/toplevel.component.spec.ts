import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToplevelComponent } from './toplevel.component';

describe('ToplevelComponent', () => {
  let component: ToplevelComponent;
  let fixture: ComponentFixture<ToplevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToplevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToplevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
