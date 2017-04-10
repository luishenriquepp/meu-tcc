import { Component, OnInit } from '@angular/core';
import { Comparador, Aluguel, Investimento, ExtratoAluguel } from '../models/aluguel/aluguel';
import { FinanciamentoBuilder } from '../models/builders/financiamento-builder';

@Component({
  selector: 'app-aluguel',
  templateUrl: './aluguel.component.html',
  styleUrls: ['./aluguel.component.css']
})
export class AluguelComponent implements OnInit {

  extrato: Array<ExtratoAluguel>
  
  constructor() { }

  ngOnInit() {
    let comparador: Comparador;
    let investimento = new Investimento(40000);
    let aluguel = new Aluguel(1400);
    let fgts = new Investimento(5000);

    let builder = new FinanciamentoBuilder();
    let finanSemFgts = builder.GetFinanciamento(48, 2000, 50);
    
    comparador = new Comparador(investimento, aluguel, finanSemFgts, fgts);
    comparador.Processar();

    this.extrato = comparador.Gerenciador.ExtratoAluguel;
  }

}
