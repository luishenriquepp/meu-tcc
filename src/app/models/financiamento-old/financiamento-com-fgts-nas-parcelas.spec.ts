/* tslint:disable:no-unused-variable */

import { async, inject } from '@angular/core/testing';
import {FinanciamentoComFgtsNasParcelas} from './financiamento-com-fgts-nas-parcelas';
import { Usuario } from '../usuario';
import { FinanciamentoConfig } from '../financiamento-config';
import { FinanciamentoFgtsConfig } from '../financiamento-fgts-config';

describe('FinanciamentoComFgtsNasParcelas', () => {
  it('should create an instance', () => {
    let user = new Usuario();
    let fgtsConfig = new FinanciamentoFgtsConfig();
    let financiamentoConfig = new FinanciamentoConfig(fgtsConfig);

    expect(new FinanciamentoComFgtsNasParcelas(user,financiamentoConfig)).toBeTruthy();
  });
});
