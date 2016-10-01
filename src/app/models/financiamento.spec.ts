/* tslint:disable:no-unused-variable */

import { async, inject } from '@angular/core/testing';
import {Financiamento} from './financiamento';
import {Usuario} from './usuario';

describe('Financiamento', () => {
  it('should create an instance', () => {
    expect(new Financiamento(new Usuario())).toBeTruthy();
  });
});
