import { Component, OnInit } from '@angular/core';

import { Usuario } from '../models/usuario';
import { Financiamento } from'../models/financiamento';
import { FinanciamentoConfig } from'../models/financiamento-config';
import { FinanciamentoFgtsConfig } from '../models/financiamento-fgts-config';
import { FinanciamentoSemFgts } from '../models/financiamento-sem-fgts';
import { FinanciamentoComFgtsNasParcelas } from '../models/financiamento-com-fgts-nas-parcelas';
import { FinanciamentoComFgtsNoSaldoDevedor } from '../models/financiamento-com-fgts-no-saldo-devedor';

@Component({
  selector: 'app-financiamento',
  templateUrl: './financiamento.component.html',
  styleUrls: ['./financiamento.component.css']
})
export class FinanciamentoComponent {
  
  usuario: Usuario;
  financiamento: Financiamento;
  fgtsConfig: FinanciamentoFgtsConfig;
  financiamentoConfig: FinanciamentoConfig;
  avancado: boolean;
  fluxoDeCaixa: boolean;
  resultado: boolean;
  calculado: boolean;

  constructor() {
    this.usuario = new Usuario();
    this.fgtsConfig = new FinanciamentoFgtsConfig();
    this.financiamentoConfig = new FinanciamentoConfig(this.fgtsConfig);
    this.resultado = false;
    this.fluxoDeCaixa = false;
    this.avancado = false;
    this.calculado = false;
  }

  onCalcular(user: Usuario) {
    this.avancado = false;
    this.fluxoDeCaixa = false;
    this.usuario = user;
    this.financiamento = new FinanciamentoComFgtsNasParcelas(this.usuario, this.financiamentoConfig);
    this.financiamento.Configuracao = this.financiamentoConfig;
    this.financiamentoConfig.Seguro.Usuario = this.usuario;
    this.financiamentoConfig.Seguro.Calcular();
    // alert('Taxa de seguro usada foi: '+this.financiamentoConfig.Seguro.MIP);
    this.financiamento.FluxoDeCaixa();
    this.calculado = true;
    this.resultado = true;
  }

  exibeFluxoDeCaixa(): void {
    this.avancado = false;
    this.resultado = false;
    this.fluxoDeCaixa = true;
  }

  exibeResultado(): void {
    this.avancado = false;
    this.fluxoDeCaixa = false;
    this.resultado = true;
  }

  exibeAvancado(): void {
    this.fluxoDeCaixa = false;
    this.resultado = false;
    this.avancado = true;
  }

}
