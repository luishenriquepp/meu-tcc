/* tslint:disable:no-unused-variable */

import { async, inject } from '@angular/core/testing';
import {FinanciamentoFactory} from './financiamento-factory';
import {FinanciamentoFgtsConfig} from '../models/financiamento-fgts-config';
import {FinanciamentoConfig} from '../models/financiamento-config';
import {Usuario} from '../models/usuario';
import {SeguradoraHdi} from '../models/seguradora-hdi';
import {FinanciamentoSeguro} from '../models/financiamento-seguro';

describe('FinanciamentoFactory', () => {
  it('should create an instance', () => {
    let hdi = new SeguradoraHdi();
    let seguro = new FinanciamentoSeguro(hdi);
    let fgtsConfig = new FinanciamentoFgtsConfig();
    let financiamentoConfig = new FinanciamentoConfig(fgtsConfig);
    financiamentoConfig.Seguro = seguro;
    let user = new Usuario();
    expect(new FinanciamentoFactory(user, financiamentoConfig)).toBeTruthy();
  });
});
