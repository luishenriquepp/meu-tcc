import { Component, OnInit, Input } from '@angular/core';
import { FinanciamentoToString } from '../utils/financiamento-to-string';
import { FinanciamentoService } from '../services/financiamento-services';

import { Financiamento } from '../models/financiamento';

@Component({
  selector: 'app-financiamento-save',
  templateUrl: './financiamento-save.component.html',
  styleUrls: ['./financiamento-save.component.css'],
  providers: [FinanciamentoService]
})
export class FinanciamentoSaveComponent implements OnInit {

  @Input() financiamento: Financiamento;

  private toString: FinanciamentoToString;

  private identifier: string;
  private description: string;
  private isAdicionado: boolean;

  constructor(private financiamentoService: FinanciamentoService) { }

  ngOnInit() {
    this.toString = new FinanciamentoToString(this.financiamento);
  }

  private sugerir(): void {
      this.description = this.toString.toString();
  }

  private adicionar(): void {
    this.financiamento.Identificacao = this.identifier;
    this.financiamento.Descricao = this.description;
    
    this.financiamentoService.Adiciona(this.financiamento).then((fin) => {
      this.isAdicionado = true;
    }, () => {
      console.log('Falha ao salvar financiamento');
    })
  }

}
