import { Component, OnInit } from '@angular/core';

import { Usuario } from '../models/usuario';
import { Financiamento } from'../models/financiamento';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  usuario: Usuario;
  financiamento: Financiamento;
  exibir: boolean;

  constructor() {
    this.exibir = false;  
  }

  onCalcular(user: Usuario) {
    this.usuario = user;
    this.financiamento = new Financiamento(this.usuario);
    this.financiamento.fdc();
    this.exibir = this.financiamento.prestacoes.length > 0;
  }
    
  ngOnInit() {
  }
}
