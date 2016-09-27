import { Component, OnInit } from '@angular/core';

import { Usuario } from '../models/usuario';
import { Financiamento } from '../models/financiamento'

@Component({
  selector: 'formulario',
  templateUrl: './app.formulario.component.html'
})
export class FormularioComponent implements OnInit {
  
  public usuario: Usuario = new Usuario();
  public finan: Financiamento;
  
  constructor() { }

  private title: string = "Home";
  private aluguel: string = "Aluguel";
  private financiamento: string = "Financiamento";
  private consorcio: string = "Consórcio";

  calcular(): void {
    this.finan = new Financiamento(this.usuario);
    this.finan.fdc();
  }

  ngOnInit() {
  }
}
