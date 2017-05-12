import { Component, OnInit, Input } from '@angular/core';
import {ExtratoFinanciamento} from '../../models/financiamento/extrato-financiamento';
import {Posterior} from '../../models/financiamento-fgts-config';

@Component({
  selector: 'extrato-financiamento',
  templateUrl: './extrato-financiamento.component.html'
})
export class ExtratoFinanciamentoComponent { 
  @Input() naoUsaFgts: boolean;
  @Input() posterior: Posterior;
  @Input() extrato: Array<ExtratoFinanciamento>;
}
