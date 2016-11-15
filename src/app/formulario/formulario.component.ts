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
  @Output() onFgts = new EventEmitter<boolean>();
  private dateUtils: Dates;
  
  private valorImovel: number;
  private disponivel: number;
  private prestacoes: number;
  private renda: number;
  private nascimento: string;
  private possuiFGTS: boolean;
  private fgtsAcumulado: number;

  ngOnInit() {
    this.valorImovel = 200000;
    this.disponivel = 25000;
    this.prestacoes = 24;
    this.renda = 4500;
    this.possuiFGTS = false;
    this.nascimento = "21/04/1988";
    this.fgtsAcumulado = 0;    
  }
  
  get possuiFgtsModel(): boolean {
    return this.possuiFGTS;
  }
  
  set possuiFgtsModel(value) {
    this.possuiFGTS = value;
    this.onFgts.emit(value);
  }
  
  calcular(): void {
    var user = new Usuario();
    user.valorImovel = this.valorImovel;
    user.disponivel = this.disponivel;
    user.prestacoes = this.prestacoes;
    user.usaFGTS = this.possuiFGTS;
    user.renda = this.renda;
    user.FGTS = this.fgtsAcumulado;
    user.nascimento = new Date(this.nascimento);
    this.onCalcular.emit(user);
  }

  validaForm(): boolean {
    if(this.valorImovel < 10000) {
      return false;
    }
    if(this.disponivel < this.valorImovel*0.1 || this.disponivel > this.valorImovel*0.9) {
      return false;
    }    
    if(this.prestacoes < 12 || this.prestacoes > 480) {
      return false;
    }
    if(this.renda < 0) {
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
