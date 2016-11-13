import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

import { Usuario } from '../models/usuario';
import { Dates } from '../utils/dates';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})
export class FormularioComponent implements OnInit {

  @Input() title;
  @Output() onCalcular = new EventEmitter<Usuario>();
  usuario: Usuario;
  dateUtils: Dates;
  nascimento: string;

  constructor() {}

  ngOnInit() {
    this.usuario = new Usuario();
    this.usuario.disponivel = 25000;
    this.usuario.valorImovel = 200000;
    this.usuario.renda = 4500;    
  }
  
  calcular(): void {
    this.usuario.nascimento = new Date(this.nascimento);
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
    if(!this.nascimento) {
      return false;
    }
    if(!this.validaData()) {
      return false;
    }
    
    this.dateUtils = new Dates(new Date(this.nascimento));
    var idade = this.dateUtils.GetIdade(); 
    if(idade < 18 || idade > 100) {
      return false;
    }
    return true;
  } 

  private validaData(): boolean {
    var primeiroDigito = this.nascimento.substring(0,1);
    if(parseInt(primeiroDigito) > 0) {
      return true;
    } else {
      return false;
    }
  }
}
