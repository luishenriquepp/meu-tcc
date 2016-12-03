/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExtratoFgtsComponent } from './extrato-fgts.component';

describe('ExtratoFgtsComponent', () => {
  let component: ExtratoFgtsComponent;
  let fixture: ComponentFixture<ExtratoFgtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtratoFgtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtratoFgtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
