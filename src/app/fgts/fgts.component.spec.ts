/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FgtsComponent } from './fgts.component';

describe('FgtsComponent', () => {
  let component: FgtsComponent;
  let fixture: ComponentFixture<FgtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
