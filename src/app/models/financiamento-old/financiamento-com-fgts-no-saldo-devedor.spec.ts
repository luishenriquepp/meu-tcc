/* tslint:disable:no-unused-variable */

import { async, inject } from '@angular/core/testing';
import {FinanciamentoComFgtsNoSaldoDevedor} from './financiamento-com-fgts-no-saldo-devedor';
import { Usuario } from '../usuario';
import { FinanciamentoConfig } from '../financiamento-config';
import { FinanciamentoFgtsConfig } from '../financiamento-fgts-config';

describe('FinanciamentoComFgtsNoSaldoDevedor', () => {
  it('should create an instance', () => {
    let user = new Usuario();
    let fgtsConfig = new FinanciamentoFgtsConfig();
    let financiamentoConfig = new FinanciamentoConfig(fgtsConfig);
    expect(new FinanciamentoComFgtsNoSaldoDevedor(user, financiamentoConfig)).toBeTruthy();
  });
});
