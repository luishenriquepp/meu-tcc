import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import {FinanciamentoRemoteService} from '../../services/financiamento-remote-service';
import {ConfigurationRemoteService} from '../../services/configuration-remote-service';
import {ConfigurationSelectedService} from '../../services/configuration-selected.service';
import {MaskService} from '../../services/mask-service';
import {IIdentifier} from '../../models/i-identifier';
import {AdvancedProperties} from '../../models/financiamento/advanced-properties';
import {GlobalConfiguration} from '../../models/global-configuration';
import {AluguelConfig} from '../../models/aluguel/aluguel-config';

@Component({
  selector: 'app-formulario-aluguel',
  templateUrl: './formulario-aluguel.component.html',
  styleUrls: ['../../financiamento/formulario/formulario.component.css'],
  providers: [FinanciamentoRemoteService, MaskService, ConfigurationRemoteService]
})
export class FormularioAluguelComponent implements OnInit {

  private financiamentos: Array<IIdentifier>; 
  private financiamentoSelecionado: AdvancedProperties = null;
  private configurations: Array<GlobalConfiguration>;
  private configurationSelecionado: GlobalConfiguration = null;
  private aluguelInicial: string;
  private descricaoFinanciamento: string;
  private mask = this.maskService.numberMask;
  private compensar: boolean = true;

  @Output() sendFinanciamento = new EventEmitter<any>();
  
  constructor(
    private selectedConfiguration: ConfigurationSelectedService,
    private maskService: MaskService,
    private remoteService: FinanciamentoRemoteService,
    private configurationRemoteService: ConfigurationRemoteService) {}

  ngOnInit(): void {
    this.remoteService.GetAll().subscribe((fin) => {
      this.financiamentos = fin as Array<AdvancedProperties>;
    });
    this.configurationRemoteService.BuscaTodos().subscribe((config) => {
      this.configurations = config as Array<GlobalConfiguration>;
        this.configurationSelecionado = config[0];
    });
  }

  private comparar(): void {
    let aluguel = new AluguelConfig();
    aluguel.compensar = this.compensar;
    aluguel.property = this.financiamentoSelecionado;
    aluguel.configuration = this.configurationSelecionado;
    aluguel.aluguelInicial = this.compensar ? this.maskService.ConvertToNumber(this.aluguelInicial) : 0;
    this.sendFinanciamento.emit(aluguel);
  }

  private onChangeFinanciamento(): void {
    if(this.financiamentoSelecionado) {
      this.descricaoFinanciamento = this.financiamentoSelecionado.Descricao;
    } else {
      this.descricaoFinanciamento = '';
    }
  }

  private isValid(): boolean {
    if(this.compensar) {
        if(this.aluguelInicial && this.maskService.ConvertToNumber(this.aluguelInicial) > 0 && this.financiamentoSelecionado)
          return true;
    } else {
        if(this.financiamentoSelecionado)
          return true;
    } 
  }
}