import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'formulario',
  templateUrl: './formulario.component.html'
})
export class FormularioComponent implements OnInit {

  constructor() { }

  title: string = "Home";
  aluguel: string = "Aluguel";
  financiamento: string = "Financiamento";
  consorcio: string = "Consórcio";

  ngOnInit() {
  }

}
