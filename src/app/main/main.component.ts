import { Component } from '@angular/core';

import { Usuario } from '../models/usuario';
import { Financiamento } from'../models/financiamento';
import { FinanciamentoConfig } from'../models/financiamento-config';
import { FinanciamentoFgtsConfig } from '../models/financiamento-fgts-config';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent {

  usuario: Usuario;
  financiamento: Financiamento;
  fgtsConfig: FinanciamentoFgtsConfig;
  financiamentoConfig: FinanciamentoConfig;

  exibir: boolean;
  exibir2: boolean;

  constructor() {
    this.usuario = new Usuario();
    this.fgtsConfig = new FinanciamentoFgtsConfig();
    this.financiamentoConfig = new FinanciamentoConfig(this.fgtsConfig);
    this.exibir = false;
  }

  onCalcular(user: Usuario) {
    this.usuario = user;
    this.financiamento = new Financiamento(this.usuario, this.financiamentoConfig);
    this.financiamentoConfig.Seguro.Usuario = this.usuario;
    this.financiamentoConfig.Seguro.Calcular();
    alert('Taxa de seguro usada foi: '+this.financiamentoConfig.Seguro.MIP);
    this.financiamento.FluxoDeCaixa();
    this.financiamento.FluxoDeFGTS();
    this.exibir = true;
  }
}
