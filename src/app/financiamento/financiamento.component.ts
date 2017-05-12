import { Component, OnInit } from '@angular/core';

import {Usuario} from '../models/usuario';
import {FinanciamentoConfig} from'../models/financiamento-config';
import {FinanciamentoFgtsConfig} from '../models/financiamento-fgts-config';
import {ConfigurationService} from '../services/configuration-service';
import {FinanciamentoProcessorService} from '../services/financiamento-processor-service';
import {ExtratoFinanciamento} from '../models/financiamento/extrato-financiamento';
import {AdvancedProperties} from '../models/financiamento/advanced-properties';
import {Posterior} from '../models/financiamento-fgts-config';

@Component({
  selector: 'app-financiamento',
  templateUrl: './financiamento.component.html',
  styleUrls: ['./financiamento.component.css'],
  providers: [ConfigurationService, FinanciamentoProcessorService]
})
export class FinanciamentoComponent {
  
  private properties: AdvancedProperties;
  private usuario: Usuario;
  private fgtsConfig: FinanciamentoFgtsConfig;
  private financiamentoConfig: FinanciamentoConfig;
  private avancado: boolean;
  private fluxoDeCaixa: boolean;
  private resultado: boolean;
  private calculado: boolean;
  private fgts: boolean;
  private saveScreen: boolean;
  private isUsingFgts: boolean;
  private posterior: Posterior = Posterior.NaoUsar;

  private extrato: Array<ExtratoFinanciamento> = [];

  constructor(private processorService: FinanciamentoProcessorService) {
    this.usuario = new Usuario();
    this.fgtsConfig = new FinanciamentoFgtsConfig();
    this.financiamentoConfig = new FinanciamentoConfig();
    
    this.properties = new AdvancedProperties(this.usuario, this.financiamentoConfig, this.fgtsConfig, null);
    
    this.resultado = false;
    this.fluxoDeCaixa = false;
    this.avancado = false;
    this.calculado = false;
    this.fgts = false;
    this.saveScreen = false;
  }
  onCalcular(user: Usuario) {
    this.fgts = false;
    this.avancado = false;
    this.fluxoDeCaixa = false;
    Object.assign(this.usuario, user);
    this.extrato = this.processorService.Process(this.properties);    
    this.isUsingFgts = this.properties.UsaFgts();
    this.posterior = this.properties.Posterior();
    this.calculado = true;
    this.resultado = true;
    console.log(this.posterior);
  }
  onFgts(fgts: boolean) {
    this.usuario.usaFGTS = fgts;
  }
  exibeFluxoDeCaixa(): void {
    this.fgts = false;
    this.avancado = false;
    this.resultado = false;
    this.saveScreen = false;
    this.fluxoDeCaixa = true;
  }
  exibeResultado(): void {
    this.fgts = false;
    this.avancado = false;
    this.fluxoDeCaixa = false;
    this.saveScreen = false;
    this.resultado = true;
  }
  exibeAvancado(): void {
    this.fgts = false;
    this.fluxoDeCaixa = false;
    this.resultado = false;
    this.saveScreen = false;
    this.avancado = true;
  }
  exibeExtrato(): void {
    this.fluxoDeCaixa = false;
    this.resultado = false;
    this.avancado = false;
    this.fgts = true;
    this.saveScreen = false;
  }
  exibeSaveScreen(): void {
    this.fluxoDeCaixa = false;
    this.resultado = false;
    this.avancado = false;
    this.fgts = false;
    this.saveScreen = true;
  }
}