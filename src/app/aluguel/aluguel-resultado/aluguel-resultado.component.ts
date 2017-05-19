import { Component, OnChanges, Input } from '@angular/core';
import {ExtratoAluguel} from '../../models/aluguel/extrato-aluguel';
import {Comparador} from '../../models/aluguel/comparador';

@Component({
  selector: 'app-aluguel-resultado',
  templateUrl: './aluguel-resultado.component.html',
  styleUrls: ['./aluguel-resultado.component.css']
})
export class AluguelResultadoComponent implements OnChanges {

  @Input() extratoAluguel: Array<ExtratoAluguel>;
  public investimentoInicial: number;
  public investimentoRendimentos: number;
  public investimentoAportes: number;

  public fgtsInicial: number;
  public fgtsRendimentos: number;
  public fgtsAportes: number;  

  ngOnChanges() {
    this.investimentoRendimentos = this.buscaTotalDeRendimentos();
    this.investimentoAportes = this.buscaTotalDeAportes();
    this.investimentoInicial = this.extratoAluguel[0].MontanteInvestimento;
    this.fgtsRendimentos = this.buscaTotalDeRendimentosFgts();
    this.fgtsAportes = this.buscaTotalDeAportesFgts();
    this.fgtsInicial = this.extratoAluguel[0].MontanteFGTS;  
  }

  private buscaTotalDeRendimentos(): number  {
    return this.extratoAluguel.reduce((a,b) => a + b.RendimentoFundo,0);
  }

  private buscaTotalDeAportes(): number {
    return this.extratoAluguel.reduce((a,b) => a + b.DepositoFundo,0);
  }

  private buscaTotalDeAportesFgts(): number {
    return this.extratoAluguel.reduce((a,b) => a + b.DepositoFGTS,0);
  }

  private buscaTotalDeRendimentosFgts(): number {
    return this.extratoAluguel.reduce((a,b) => a + b.RendimentoFGTS,0);
  }

  public InvestimentoTotal(): number {
    return this.investimentoInicial + this.investimentoRendimentos + this.investimentoAportes;
  }

  public FgtsTotal(): number {
    return this.fgtsInicial + this.fgtsRendimentos + this.fgtsAportes;
  }

  public Total(): number {
    return this.InvestimentoTotal() + this.FgtsTotal();
  }

  public SaldoPatrimonialLiquido(): number {
    return this.fgtsRendimentos + this.investimentoRendimentos;
  }
}
