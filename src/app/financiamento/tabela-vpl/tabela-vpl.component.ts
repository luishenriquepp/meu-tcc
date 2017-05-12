import { Component, OnInit, Input } from '@angular/core';
import {ExtratoFinanciamento} from '../../models/financiamento/extrato-financiamento';
import {Posterior} from '../../models/financiamento-fgts-config';

@Component({
  selector: 'app-tabela-vpl',
  templateUrl: './tabela-vpl.component.html',
  styleUrls: ['./tabela-vpl.component.css']
})
export class TabelaVplComponent { 
  @Input() naoUsaFgts: boolean;
  @Input() posterior: Posterior;
  @Input() extrato: Array<ExtratoFinanciamento>;
}
