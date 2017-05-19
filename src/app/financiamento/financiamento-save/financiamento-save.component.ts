import {Component,OnInit,Input} from '@angular/core';
import {FinanciamentoToString} from '../../utils/financiamento-to-string';
import {FinanciamentoService} from '../../services/financiamento-services';
import {AdvancedProperties} from '../../models/financiamento/advanced-properties';

@Component({
  selector: 'financiamento-save',
  templateUrl: './financiamento-save.component.html',
  providers: [FinanciamentoService]
})
export class FinanciamentoSaveComponent implements OnInit {

  @Input() financiamento: AdvancedProperties;

  private toString: FinanciamentoToString;

  private identifier: string;
  private description: string;
  private isAdicionado: boolean;

  constructor(private financiamentoService: FinanciamentoService) { }

  ngOnInit() {
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
    
    this.financiamentoService.Adiciona(this.financiamento).then((fin) => {
      this.isAdicionado = true;
    }, () => {
      console.log('Falha ao salvar financiamento');
    })
  }

  private isValid(): boolean {
    if(this.identifier)
      return true;
  }

}
