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
    this.usuario.renda = 4500;;
  }
  
  calcular(): void {
    this.onCalcular.emit(this.usuario);
  }

  validaForm(): boolean {
    if(this.usuario.valorImovel < 10000) {
      return false;
    }

    if(this.usuario.disponivel < this.usuario.valorImovel*0.1 || this.usuario.disponivel > this.usuario.valorImovel*0.9) {
      return false;
    }
    
    if(this.usuario.prestacoes < 12 || this.usuario.prestacoes > 480) {
      return false;
    }

    if(this.usuario.renda < 0) {
      return false;
    }
    return true;
  } 
}
