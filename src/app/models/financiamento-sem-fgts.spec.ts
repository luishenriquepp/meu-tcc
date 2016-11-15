/* tslint:disable:no-unused-variable */

import { async, inject } from '@angular/core/testing';
import { FinanciamentoSemFgts } from './financiamento-sem-fgts';
import { Usuario } from './usuario';
import { FinanciamentoConfig } from './financiamento-config';
import { FinanciamentoFgtsConfig } from './financiamento-fgts-config';

describe('FinanciamentoSemFgts', () => {
  it('should create an instance', () => {
    
    let user = new Usuario();
    let fgtsConfig = new FinanciamentoFgtsConfig();
    let financiamentoConfig = new FinanciamentoConfig(fgtsConfig);
    
    expect(new FinanciamentoSemFgts(user, financiamentoConfig)).toBeTruthy();
  });
});
