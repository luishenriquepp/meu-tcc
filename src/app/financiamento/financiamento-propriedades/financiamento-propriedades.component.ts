import { Component, Input, OnInit } from '@angular/core';

import { FinanciamentoConfig } from '../../models/financiamento-config';
import { FinanciamentoSeguro } from'../../models/financiamento-seguro';
import {ConfigurationRemoteService} from '../../services/configuration-remote-service';
import {ConfigurationSelectedService} from '../../services/configuration-selected.service';
import {GlobalConfiguration} from '../../models/global-configuration';


@Component({
  selector: 'financiamento-propriedades',
  templateUrl: './financiamento-propriedades.component.html',
  providers: [ConfigurationRemoteService]
})
export class FinanciamentoPropriedadesComponent implements OnInit{

  private configurations: Array<GlobalConfiguration>;
  private configuration: GlobalConfiguration = new GlobalConfiguration();
  
  constructor(private configurationRemoteService: ConfigurationRemoteService,
              private selectedConfiguration: ConfigurationSelectedService) { }
  
  @Input() config: FinanciamentoConfig;

  ngOnInit() {
    this.configurationRemoteService.BuscaTodos().subscribe((taxas) => {
        this.configurations = taxas as Array<GlobalConfiguration>;
        this.configuration =  taxas[0];
        this.selectedConfiguration.Configuration = this.configuration;
    })
  }

  selecionaSeguro(event): void {
      if(event.target.value == "sa") {
        // this.config.Seguro = new FinanciamentoSeguro(new SeguradoraSa());
      } else {
        // this.config.Seguro = new FinanciamentoSeguro(new SeguradoraHdi());
      }
  }

  onPropertyChange(configuration): void {
    let con = this.configurations.find(c => c.Id == this.configuration.Id);
    this.selectedConfiguration = configuration;
  }
}
