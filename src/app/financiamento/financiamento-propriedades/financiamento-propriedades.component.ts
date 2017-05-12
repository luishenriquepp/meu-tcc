import { Component, Input, OnInit } from '@angular/core';

import { FinanciamentoConfig } from '../../models/financiamento-config';
import { FinanciamentoSeguro } from'../../models/financiamento-seguro';
import { SeguradoraSa } from'../../models/seguradora-sa';
import { SeguradoraHdi } from'../../models/seguradora-hdi';

@Component({
  selector: 'app-financiamento-propriedades',
  templateUrl: './financiamento-propriedades.component.html'
})
export class FinanciamentoPropriedadesComponent implements OnInit{

  @Input() config: FinanciamentoConfig;

  ngOnInit() {
    // this.config.Seguro = new FinanciamentoSeguro(new SeguradoraSa());
  }

  selecionaSeguro(event): void {
      if(event.target.value == "sa") {
        // this.config.Seguro = new FinanciamentoSeguro(new SeguradoraSa());
      } else {
        // this.config.Seguro = new FinanciamentoSeguro(new SeguradoraHdi());
      }
  }
}
