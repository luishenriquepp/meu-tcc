import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AluguelResultadoComponent } from './aluguel-resultado.component';
import {ExtratoAluguel} from '../../models/aluguel/extrato-aluguel';
import {Comparador} from '../../models/aluguel/comparador';
import {ExtratoFinanciamento} from '../../models/financiamento/extrato-financiamento';
import {ExtratoFinanciamentoBuilder} from '../../models/builders/extrato-financiamento-builder';

describe('AluguelResultadoComponent', () => {
  let component: AluguelResultadoComponent;
  let fixture: ComponentFixture<AluguelResultadoComponent>;
  let extrato: Array<ExtratoAluguel>;
  let comparador: Comparador;
  let extratoFinanciamento: Array<ExtratoFinanciamento>;

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

    let builder = new ExtratoFinanciamentoBuilder();
    extratoFinanciamento = builder.Build(12);

    this.comparador = new Comparador(null,null,extratoFinanciamento, null, null);

    TestBed.configureTestingModule({
      declarations: [ AluguelResultadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AluguelResultadoComponent);
    component = fixture.componentInstance;
    component.extratoAluguel = extrato;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should calculate the amount of financiamento aportes', () => {
    expect(component.investimentoAportes).toBe(1000*12)
  });

  xit('should calculate the amount of financiamento rendimentos', () => {
    expect(component.investimentoRendimentos).toBe(20*12)
  });

  xit('should take the first moment as entrada of investimento', () => {
    expect(component.investimentoInicial).toBe(20000)
  });
});
