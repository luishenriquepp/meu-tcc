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

  titulo: string  = 'titulo';
  
  constructor() { }

  onCalcular(user: Usuario) {
    this.usuario = user;
    this.titulo = user.disponivel.toString();
    this.financiamento = new Financiamento(this.usuario);
    this.financiamento.fdc();
  }
    
  ngOnInit() {
  }

}
