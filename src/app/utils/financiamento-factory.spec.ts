/* tslint:disable:no-unused-variable */

import { async, inject } from '@angular/core/testing';
import {FinanciamentoFactory} from './financiamento-factory';
import {FinanciamentoFgtsConfig} from '../models/financiamento-fgts-config';
import {FinanciamentoConfig} from '../models/financiamento-config';
import {Usuario} from '../models/usuario';

describe('FinanciamentoFactory', () => {
  it('should create an instance', () => {
    let fgtsConfig = new FinanciamentoFgtsConfig();
    let financiamentoConfig = new FinanciamentoConfig(fgtsConfig);
    let user = new Usuario();
    expect(new FinanciamentoFactory(user, financiamentoConfig)).toBeTruthy();
  });
});
