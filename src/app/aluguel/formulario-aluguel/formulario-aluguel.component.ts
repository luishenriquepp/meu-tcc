import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import {Financiamento} from '../../models/financiamento';
import {FinanciamentoService} from '../../services/financiamento-services';
import {IIdentifier} from '../../models/i-identifier';

@Component({
  selector: 'app-formulario-aluguel',
  templateUrl: './formulario-aluguel.component.html',
  styleUrls: ['./formulario-aluguel.component.css'],
  providers: [FinanciamentoService]
})
export class FormularioAluguelComponent implements OnInit {

  private financiamentos: Array<IIdentifier>; 
  private financiamentoSelecionado: Financiamento;
  private aluguelInicial: number = 0;
  @Output() sendFinanciamento = new EventEmitter<Financiamento>();
  
  constructor(private financiamentoService: FinanciamentoService) {}

  ngOnInit() {
      this.financiamentoService.BuscaTodos().then((financiamentos) => {
      this.financiamentos = financiamentos;
    })
  }

  private comparar(): void {
    this.sendFinanciamento.emit(this.financiamentoSelecionado);
  }
}