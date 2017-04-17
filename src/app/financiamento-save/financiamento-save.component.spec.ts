import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanciamentoSaveComponent } from './financiamento-save.component';

describe('FinanciamentoSaveComponent', () => {
  let component: FinanciamentoSaveComponent;
  let fixture: ComponentFixture<FinanciamentoSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanciamentoSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanciamentoSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
