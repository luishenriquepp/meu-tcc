/* tslint:disable:no-unused-variable */

import { async, inject } from '@angular/core/testing';
import {FinanciamentoSeguro} from './financiamento-seguro';
import {SeguradoraHdi} from './seguradora-hdi';

describe('FinanciamentoSeguro', () => {
  it('should create an instance', () => {
    let seguradora = new SeguradoraHdi();
    expect(new FinanciamentoSeguro(seguradora)).toBeTruthy();
  });
});
