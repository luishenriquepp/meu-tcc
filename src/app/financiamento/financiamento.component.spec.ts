/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FinanciamentoComponent } from './financiamento.component';
import {FinanciamentoProcessorService} from '../services/financiamento-processor-service';
import {ConfigurationSelectedService} from '../services/configuration-selected.service';

describe('Component: Financiamento', () => {
  
  let selectedConfiguration: ConfigurationSelectedService;
  let processorService: FinanciamentoProcessorService;

  beforeEach(() => {

    selectedConfiguration = new ConfigurationSelectedService();
    processorService = new FinanciamentoProcessorService(selectedConfiguration);
    
    TestBed.configureTestingModule({
      providers: [
        { provide: processorService, useClass: processorService }]
    })
    TestBed.compileComponents();
  })
  
  it('should create an instance', () => {
    let component = new FinanciamentoComponent(processorService, selectedConfiguration);
    expect(component).toBeTruthy();
  });
});
