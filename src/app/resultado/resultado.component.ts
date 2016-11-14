import { Component, OnInit, Input } from '@angular/core';

import { Usuario } from '../models/usuario';
import { Financiamento } from'../models/financiamento';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  @Input() financiamento: Financiamento;

  comprometimento: number;

  ngOnInit() {
    this.comprometimento = 0;
  }
}
