import { Component, Input, OnInit } from '@angular/core';

import { FinanciamentoConfig } from '../models/financiamento-config';
import { FinanciamentoFgtsConfig } from '../models/financiamento-fgts-config';
import { FinanciamentoSeguro } from'../models/financiamento-seguro';
import { SeguradoraSa } from'../models/seguradora-sa';
import { SeguradoraHdi } from'../models/seguradora-hdi';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-financiamento-propriedades',
  templateUrl: './financiamento-propriedades.component.html'
})
export class FinanciamentoPropriedadesComponent implements OnInit{

  @Input() config: FinanciamentoConfig;
  @Input() teste: FinanciamentoFgtsConfig;
  @Input() usuario: Usuario;

  ngOnInit() {
    this.config.Seguro = new FinanciamentoSeguro(new SeguradoraSa());
  }

  selecionaSeguro(event): void {
      if(event.target.value == "sa") {
        this.config.Seguro = new FinanciamentoSeguro(new SeguradoraSa());
      } else {
        this.config.Seguro = new FinanciamentoSeguro(new SeguradoraHdi());
      }
  }
}
