/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FinanciamentoPropriedadesComponent } from './financiamento-propriedades.component';
import { ConfigurationService } from '../../services/configuration-service';

describe('Component: FinanciamentoPropriedades', () => {
  let service = new ConfigurationService();
  it('should create an instance', () => {
    let component = new FinanciamentoPropriedadesComponent(service);
    expect(component).toBeTruthy();
  });
});
