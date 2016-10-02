import { Component, OnInit, Input } from '@angular/core';

import { Usuario } from '../models/usuario';
import { Financiamento } from'../models/financiamento';

@Component({
  selector: 'app-tabela-vpl',
  templateUrl: './tabela-vpl.component.html',
  styleUrls: ['./tabela-vpl.component.css']
})
export class TabelaVplComponent implements OnInit{ 

  @Input() exibirTabela: boolean;  
  @Input() financiamento: Financiamento;

  ngOnInit() {
    this.financiamento = new Financiamento(new Usuario());
  }
}
