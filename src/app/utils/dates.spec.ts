/* tslint:disable:no-unused-variable */

import { async, inject } from '@angular/core/testing';
import {Dates} from './dates';

describe('Dates', () => {
  it('should create an instance', () => {
    expect(new Dates(new Date(1988, 4))).toBeTruthy();
  });
  it('should return the correct age', () => {
    var dateUtils = new Dates(new Date(1988, 4));
    var idade = dateUtils.GetIdade();
    expect(29).toBe(idade);
  });
});
