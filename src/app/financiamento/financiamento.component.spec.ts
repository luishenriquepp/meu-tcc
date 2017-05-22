/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FinanciamentoComponent } from './financiamento.component';
import {FinanciamentoProcessorService} from '../services/financiamento-processor-service';

describe('Component: Financiamento', () => {
  
  let processorService: FinanciamentoProcessorService;

  beforeEach(() => {

    processorService = new FinanciamentoProcessorService();
    
    TestBed.configureTestingModule({
      providers: [
        { provide: processorService, useClass: processorService }]
    })
    TestBed.compileComponents();
  })
  
  it('should create an instance', () => {
    let component = new FinanciamentoComponent(processorService);
    expect(component).toBeTruthy();
  });
});
