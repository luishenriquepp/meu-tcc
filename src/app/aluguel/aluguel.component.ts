import {Component} from '@angular/core';
import {ExtratoAluguel} from '../models/aluguel/aluguel';
import {Financiamento} from '../models/financiamento';
import {FinanciamentoService} from '../services/financiamento-services';
import {IIdentifier} from '../models/i-identifier';
import {Comparador,Investimento,Aluguel} from '../models/aluguel/aluguel';

@Component({
  selector: 'app-aluguel',
  templateUrl: './aluguel.component.html',
  styleUrls: ['./aluguel.component.css'],
})
export class AluguelComponent {

  private extratoAluguel: Array<ExtratoAluguel>;
  private calculado: boolean = false;
  private fluxoDeCaixa: boolean = false;
  private grafico: boolean = false;

  private onComparar(event: any): void {
    let investimento = new Investimento(event.fin.Usuario.disponivel);
    let aluguel = new Aluguel(event.aluguelInicial);
    let fgts = new Investimento(event.fin.Usuario.FGTS);

    let comparador: Comparador;
    comparador = new Comparador(investimento, aluguel, event.fin, fgts);
    comparador.Processar();

    this.extratoAluguel = comparador.Gerenciador.ExtratoAluguel;
    this.calculado = true;
    this.grafico = true;
  }
  private exibeFluxoDeCaixa(): void {
    this.grafico = false;
    this.fluxoDeCaixa = true;
  }
  private exibeGrafico(): void {
    this.fluxoDeCaixa = false;
    this.grafico = true;
  }
}
