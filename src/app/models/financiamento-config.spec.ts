/* tslint:disable:no-unused-variable */

import { async, inject } from '@angular/core/testing';
import {FinanciamentoConfig} from './financiamento-config';

describe('FinanciamentoConfig', () => {
  it('should create an instance', () => {
    let fgtsConfig = new FinanciamentoFgtsConfig();
    expect(new FinanciamentoConfig()).toBeTruthy();
  });
});
