import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

import { Usuario } from '../models/usuario';
import {IMyOptions,IMyInputFieldChanged} from 'mydatepicker';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @Input() title;
  @Output() onCalcular = new EventEmitter<Usuario>();
  @Output() onFgts = new EventEmitter<boolean>();
  private dateValid = false;
  private today = new Date();

  private myDatePickerOptions: IMyOptions = {
    showTodayBtn: false,
    dateFormat: 'dd.mm.yyyy',
    minYear: this.today.getFullYear() - 100,
    maxYear: this.today.getFullYear(),
    openSelectorTopOfInput: true
  }
  
  onInputFieldChanged(event: IMyInputFieldChanged) {
    this.dateValid = event.valid;
  }
  
  private valorImovel: number;
  private disponivel: number;
  private prestacoes: number;
  private renda: number;
  private possuiFGTS: boolean;
  private fgtsAcumulado: number;
  private birthDay: any;

  ngOnInit() {
    this.valorImovel = 200000;
    this.disponivel = 75000;
    this.prestacoes = 420;
    this.renda = 4500;
    this.possuiFGTS = true;
    this.fgtsAcumulado = 10000;
    this.birthDay = { date: { year: 1988, month: 1, day: 21}};
  }
  
  get possuiFgtsModel(): boolean {
    return this.possuiFGTS;
  }
  
  set possuiFgtsModel(value) {
    this.possuiFGTS = value;
    this.onFgts.emit(value);
  }
  
  private calcular(): void {
    var user = new Usuario();
    user.valorImovel = this.valorImovel;
    user.disponivel = this.disponivel;
    user.prestacoes = this.prestacoes;
    user.usaFGTS = this.possuiFGTS;
    user.renda = this.renda;
    user.FGTS = this.fgtsAcumulado;
    user.nascimento = new Date(this.birthDay.date.year, this.birthDay.date.month, this.birthDay.date.day);

    this.onCalcular.emit(user);
  }

  private validaForm(): boolean {
    if(this.valorImovel < 10000)
      return false;
    if(this.disponivel < this.valorImovel*0.1 || this.disponivel > this.valorImovel*0.9)
      return false;
    if(this.prestacoes < 12 || this.prestacoes > 480)
      return false;
    if(this.renda < 0)
      return false;
    if(!this.dateValid)
      return false;
    return true;
  } 
}