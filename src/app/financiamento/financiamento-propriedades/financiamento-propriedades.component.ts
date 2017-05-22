import { Component, Input, OnInit } from '@angular/core';

import { FinanciamentoConfig } from '../../models/financiamento-config';
import { FinanciamentoSeguro } from'../../models/financiamento-seguro';
import {ConfigurationService} from '../../services/configuration-service';
import {GlobalConfiguration} from '../../models/global-configuration';


@Component({
  selector: 'financiamento-propriedades',
  templateUrl: './financiamento-propriedades.component.html',
  providers: [ConfigurationService]
})
export class FinanciamentoPropriedadesComponent implements OnInit{

  private configurations: Array<GlobalConfiguration>;
  
  constructor(private configurationService: ConfigurationService) { }
  
  @Input() config: FinanciamentoConfig;
  @Input() configuration: GlobalConfiguration;

  ngOnInit() {
    // this.config.Seguro = new FinanciamentoSeguro(new SeguradoraSa());
    this.configurationService.BuscaTodos()
      .then((configurations) => {
        this.configurations = configurations;
        Object.assign(this.configuration, configurations[0]);
      });
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
    Object.assign(this.configuration,con);  
  }
}
