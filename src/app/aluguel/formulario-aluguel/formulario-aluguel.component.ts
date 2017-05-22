import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import {FinanciamentoService} from '../../services/financiamento-services';
import {ConfigurationService} from '../../services/configuration-service';
import {MaskService} from '../../services/mask-service';
import {IIdentifier} from '../../models/i-identifier';
import {AdvancedProperties} from '../../models/financiamento/advanced-properties';
import {GlobalConfiguration} from '../../models/global-configuration';
import {AluguelConfig} from '../../models/aluguel/aluguel-config';

@Component({
  selector: 'app-formulario-aluguel',
  templateUrl: './formulario-aluguel.component.html',
  styleUrls: ['../../financiamento/formulario/formulario.component.css'],
  providers: [FinanciamentoService, ConfigurationService, MaskService]
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
    private financiamentoService: FinanciamentoService,
    private configurationService: ConfigurationService,
    private maskService: MaskService) {}

  ngOnInit(): void {
    this.financiamentoService.BuscaTodos().then((financiamentos) => {
      this.financiamentos = financiamentos;
    });
    this.configurationService.BuscaTodos().then((configurations) => {
      this.configurations = configurations;
      this.configurationSelecionado = configurations[0];
    });
  }

  private comparar(): void {
    let aluguel = new AluguelConfig();
    aluguel.compensar = this.compensar;
    aluguel.property = this.financiamentoSelecionado;
    aluguel.configuration = this.configurationSelecionado;
    aluguel.property.GlobalConfiguration = aluguel.configuration;
    aluguel.aluguelInicial = this.maskService.ConvertToNumber(this.aluguelInicial);
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
    if(this.aluguelInicial && this.maskService.ConvertToNumber(this.aluguelInicial) > 0 && this.financiamentoSelecionado)
      return true;
  }
}