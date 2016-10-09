import { Component, OnInit } from '@angular/core';

import { Usuario } from '../models/usuario';
import { Financiamento } from'../models/financiamento';
import { FinanciamentoConfig } from'../models/financiamento-config';
import { FinanciamentoSeguro } from'../models/financiamento-seguro';
import { SeguradoraSa } from'../models/seguradora-sa';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  usuario: Usuario;
  financiamento: Financiamento;
  config: FinanciamentoConfig = new FinanciamentoConfig();
  exibir: boolean;

  constructor() {
    this.exibir = false;  
  }

  onCalcular(user: Usuario) {
    this.usuario = user;
    this.financiamento = new Financiamento(this.usuario, this.config);
    this.config.Seguro = new FinanciamentoSeguro(new SeguradoraSa(), this.usuario);
    this.financiamento.FluxoDeCaixa();
    this.exibir = this.financiamento.prestacoes.length > 0;
  }
    
  ngOnInit() {
  }
}
