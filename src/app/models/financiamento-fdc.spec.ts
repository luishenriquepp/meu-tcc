/* tslint:disable:no-unused-variable */

import {  async, inject } from '@angular/core/testing';
import { FinanciamentoFdc } from './financiamento-fdc';
import { Usuario } from './usuario';

describe('FinanciamentoFdc', () => {
  it('should create an instance', () => {
    expect(new FinanciamentoFdc()).toBeTruthy();
  });

    it('deve calcular a amortizacão', () => {
    let finanFdc = new FinanciamentoFdc();
    
    let usuario = new Usuario();
    usuario.prestacoes = 10;
    
    finanFdc.setUsuario(usuario);
    finanFdc.saldoDevedor2 = 17000;
    finanFdc.amortizar(3);

    expect((17000)/(10-2)).toBe(finanFdc.amortizacao);
  });

  it('deve calcular os juros a cada parcela', () => {
    let finanFdc = new FinanciamentoFdc();
    finanFdc.config.juros_mensais = 0.05;
    finanFdc.saldoDevedor2 = 17000;
    finanFdc.calcularJuros();

    expect(17000*0.05).toBe(finanFdc.juros);
  });

    it('deve calcular a parcela', () => {
      let finanFdc = new FinanciamentoFdc();
      finanFdc.amortizacao = 10000;
      finanFdc.juros = 1000;
      finanFdc.seguros = 2;
      finanFdc.config.taxaAdm = 200;

      finanFdc.calcularParcela();

      expect(10000+1000+2+200).toBe(finanFdc.parcela);
    });

    // it('deve calcular o seguro', () => {
    //   let finanFdc = new FinanciamentoFdc();
    //   finanFdc.config.seguro_dfi = 0.03;
    //   finanFdc.config.seguro_mip = 0.07;
    //   finanFdc.saldoDevedor1 = 100000;
    //   finanFdc.saldoDevedor2 = 100000;      
    //   let user = new Usuario();
    //   user.valorImovel = 200000;      
    //   finanFdc.setUsuario(user);

    //   finanFdc.calculaSeguro();

    //   expect((0.03*200000)+(0.07*100000)).toBe(finanFdc.seguros);
    // });

    it('deve calcular a correcaoTR', () => {
      let finanFdc = new FinanciamentoFdc();
      finanFdc.config.tr_mensal = 0.08;
      finanFdc.saldoDevedor1 = 200000;

      finanFdc.calculaCorrecaoTR();

      expect(0.08*200000).toBe(finanFdc.correcaoTR);
    });

});
