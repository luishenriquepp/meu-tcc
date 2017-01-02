import { Component, OnInit, Input } from '@angular/core';

import { FinanciamentoFgtsConfig } from '../models/financiamento-fgts-config';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-fgts',
  templateUrl: './fgts.component.html',
  styleUrls: ['./fgts.component.css']
})
export class FgtsComponent implements OnInit {

  @Input() fgtsConfig: FinanciamentoFgtsConfig;
  @Input() usuario: Usuario;

  ngOnInit() {
  }

}
