import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})
export class FormularioComponent implements OnInit {

  @Output() onCalcular = new EventEmitter<Usuario>();
  usuario: Usuario;

  constructor() {}

  ngOnInit() {
    this.usuario = new Usuario();
    this.usuario.disponivel = 25000;
    this.usuario.prestacoes = 10;
    this.usuario.valorImovel = 200000;
  }
  
  calcular(): void {
    this.onCalcular.emit(this.usuario);
  }
}
