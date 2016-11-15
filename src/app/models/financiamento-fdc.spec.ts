/* tslint:disable:no-unused-variable */

import { async, inject } from '@angular/core/testing';
import { FinanciamentoFdc } from './financiamento-fdc';
import { Usuario } from './usuario';
import { FinanciamentoConfig } from './financiamento-config';
import { FinanciamentoFgtsConfig } from'./financiamento-fgts-config';

describe('FinanciamentoFdc', () => {
  it('should create an instance', () => {
    let fgtsConfig = new FinanciamentoFgtsConfig();
    let financiamentoConfig = new FinanciamentoConfig(fgtsConfig);
    expect(new FinanciamentoFdc(financiamentoConfig)).toBeTruthy();
  });

  it('deve calcular a amortizacão', () => {
  let fgtsConfig = new FinanciamentoFgtsConfig();
  let financiamentoConfig = new FinanciamentoConfig(fgtsConfig);
  let finanFdc = new FinanciamentoFdc(financiamentoConfig);
  
  let usuario = new Usuario();
  usuario.prestacoes = 10;    
  finanFdc.setUsuario(usuario);
  
  finanFdc.saldoDevedor2 = 17000;
  finanFdc.attAmortizacao(3);

  expect((17000)/(10-2)).toBe(finanFdc.amortizacao);
});

  it('deve calcular a parcela', () => {
    let fgtsConfig = new FinanciamentoFgtsConfig();
    let financiamentoConfig = new FinanciamentoConfig(fgtsConfig);
    let finanFdc = new FinanciamentoFdc(financiamentoConfig);
    
    financiamentoConfig.TaxaAdministrativa = 200;
    finanFdc.amortizacao = 10000;
    finanFdc.juros = 1000;
    finanFdc.seguros = 2;

    finanFdc.attParcela();

    expect(10000+1000+2+200).toBe(finanFdc.parcela);
  });

  it('deve calcular a correcaoTR', () => {
    let fgtsConfig = new FinanciamentoFgtsConfig();
    let financiamentoConfig = new FinanciamentoConfig(fgtsConfig);
    let finanFdc = new FinanciamentoFdc(financiamentoConfig);
    
    financiamentoConfig.TRMensal = 0.08;
    finanFdc.saldoDevedor1 = 200000;

    finanFdc.attCorrecaoTR();

    expect(0.08*200000).toBe(finanFdc.correcaoTR);
  });
});
