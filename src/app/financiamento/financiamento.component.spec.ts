/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FinanciamentoComponent } from './financiamento.component';
import {FinanciamentoProcessorService} from '../services/financiamento-processor-service';
import {ConfigurationService} from '../services/configuration-service';

describe('Component: Financiamento', () => {
  
  let processorService: FinanciamentoProcessorService;
  let configurationService: ConfigurationService;

  beforeEach(() => {

    configurationService = new ConfigurationService();
    processorService = new FinanciamentoProcessorService(configurationService);
    
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigurationService, useClass: configurationService }]
    })
    TestBed.compileComponents();
  })
  
  it('should create an instance', () => {
    let component = new FinanciamentoComponent(processorService);
    expect(component).toBeTruthy();
  });
});
