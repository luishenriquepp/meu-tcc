import { Component, OnInit, Input } from '@angular/core';
import {ExtratoFinanciamento} from '../../models/financiamento/extrato-financiamento';

@Component({
  selector: 'app-tabela-vpl',
  templateUrl: './tabela-vpl.component.html',
  styleUrls: ['./tabela-vpl.component.css']
})
export class TabelaVplComponent { 
  @Input() fgts: boolean;
  @Input() extrato: Array<ExtratoFinanciamento>;
}
