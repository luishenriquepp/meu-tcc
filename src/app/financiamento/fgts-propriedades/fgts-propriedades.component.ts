import { Component, Input } from '@angular/core';

import {FinanciamentoFgtsConfig} from '../../models/financiamento-fgts-config';
import {Posterior} from '../../models/financiamento-fgts-config';

@Component({
  selector: 'fgts-propriedades',
  templateUrl: './fgts-propriedades.component.html'
})
export class FgtsPropriedadesComponent {

  @Input() fgtsConfig: FinanciamentoFgtsConfig;

  onChangePosterior(value: string) {
    if(value == '0') {
      this.fgtsConfig.Posterior = Posterior.NaoUsar;
    } else if (value == '1') {
      this.fgtsConfig.Posterior = Posterior.SaldoDevedor;
    } else if (value == '2') {
      this.fgtsConfig.Posterior = Posterior.Parcelas;
    }
  }
}
