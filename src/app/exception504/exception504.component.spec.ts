import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exception504Component } from './exception504.component';

describe('Exception504Component', () => {
  let component: Exception504Component;
  let fixture: ComponentFixture<Exception504Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exception504Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exception504Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
