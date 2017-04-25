import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AluguelResultadoComponent } from './aluguel-resultado.component';
import {ExtratoAluguel,Comparador} from '../../models/aluguel/aluguel';
import {FinanciamentoBuilder} from '../../models/builders/financiamento-builder';

describe('AluguelResultadoComponent', () => {
  let component: AluguelResultadoComponent;
  let fixture: ComponentFixture<AluguelResultadoComponent>;
  let extrato: Array<ExtratoAluguel>;
  let comparador: Comparador;

  beforeEach(async(() => {
    
    this.extrato = new Array<ExtratoAluguel>();
    let e = new ExtratoAluguel();
    e.MontanteInvestimento = 20000;
    this.extrato.push(e);
    for(let i=1; i<=12;i++) {
      let ex = new ExtratoAluguel();
      ex.DepositoFundo = 1000;
      ex.RendimentoFundo = 20;
      this.extrato.push(ex);
    }

    let builder = new FinanciamentoBuilder();
    let fin = builder.BuildRichUserWithFGTSFinanciamento();
    this.comparador = new Comparador(null,null,fin);

    TestBed.configureTestingModule({
      declarations: [ AluguelResultadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AluguelResultadoComponent);
    component = fixture.componentInstance;
    component.extratoAluguel = this.extrato;
    component.comparador = this.comparador;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the amount of financiamento aportes', () => {
    expect(component.investimentoAportes).toBe(1000*12)
  });

  it('should calculate the amount of financiamento rendimentos', () => {
    expect(component.investimentoRendimentos).toBe(20*12)
  });

  it('should take the first moment as entrada of investimento', () => {
    expect(component.investimentoInicial).toBe(20000)
  });
});
