import {Component,OnInit,Input} from '@angular/core';
import {FinanciamentoToString} from '../../utils/financiamento-to-string';
import {FinanciamentoRemoteService} from '../../services/financiamento-remote-service';
import {AdvancedProperties} from '../../models/financiamento/advanced-properties';

@Component({
  selector: 'financiamento-save',
  templateUrl: './financiamento-save.component.html',
  providers: [FinanciamentoRemoteService]
})
export class FinanciamentoSaveComponent implements OnInit {

  @Input() financiamento: AdvancedProperties;

  private toString: FinanciamentoToString;

  private identifier: string;
  private description: string;
  private isAdicionado: boolean;

  constructor(private remoteService: FinanciamentoRemoteService) { }

  ngOnInit(): void {
    this.toString = new FinanciamentoToString(this.financiamento);
  }

  private sugerir(): void {
      this.toString.Process();
      this.identifier = this.toString.Identificacao;
      this.description = this.toString.Descricao;
  }

  private adicionar(): void {
    this.financiamento.Identificacao = this.identifier;
    this.financiamento.Descricao = this.description;      
    this.remoteService.Save(this.financiamento);
    this.isAdicionado = true;
  }

  private isValid(): boolean {
    if(this.identifier)
      return true;
  }
}
