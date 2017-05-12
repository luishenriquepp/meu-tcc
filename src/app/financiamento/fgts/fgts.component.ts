import { Component, Input } from '@angular/core';

import {FinanciamentoFgtsConfig} from '../../models/financiamento-fgts-config';
import {Posterior} from '../../models/financiamento-fgts-config';

@Component({
  selector: 'app-fgts',
  templateUrl: './fgts.component.html',
  styleUrls: ['./fgts.component.css']
})
export class FgtsComponent {

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
