/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FinanciamentoComponent } from './financiamento.component';
import {ConfigurationService} from '../services/configuration-service';

describe('Component: Financiamento', () => {
  
  let configurationService: ConfigurationService;

  beforeEach(() => {

    configurationService = new ConfigurationService()
    
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigurationService, useClass: configurationService }]
    })
    TestBed.compileComponents();
  })
  
  it('should create an instance', () => {
    let component = new FinanciamentoComponent(configurationService);
    expect(component).toBeTruthy();
  });
});
