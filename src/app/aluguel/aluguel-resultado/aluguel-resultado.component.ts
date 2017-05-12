import { Component, OnInit, Input } from '@angular/core';
import {ExtratoAluguel,Comparador} from '../../models/aluguel/aluguel';

@Component({
  selector: 'app-aluguel-resultado',
  templateUrl: './aluguel-resultado.component.html',
  styleUrls: ['./aluguel-resultado.component.css']
})
export class AluguelResultadoComponent implements OnInit {

  @Input() extratoAluguel: Array<ExtratoAluguel>;
  @Input() comparador: Comparador;
  public investimentoInicial: number;
  public investimentoRendimentos: number;
  public investimentoAportes: number;

  public fgtsInicial: number;
  public fgtsRendimentos: number;
  public fgtsAportes: number;  

  public parcelas: number;
  public entrada: number;
  public finFgtsAportes: number;
  public finFgtsRendimentos: number;
  public finInvestimentoAportes: number;
  public finInvestimentoRendimentos: number;
  public valorImovel: number;
  public disponibilidade: number;

  ngOnInit() {
    this.investimentoRendimentos = this.buscaTotalDeRendimentos();
    this.investimentoAportes = this.buscaTotalDeAportes();
    this.investimentoInicial = this.extratoAluguel[0].MontanteInvestimento;
    this.fgtsRendimentos = this.buscaTotalDeRendimentosFgts();
    this.fgtsAportes = this.buscaTotalDeAportesFgts();
    this.fgtsInicial = this.extratoAluguel[0].MontanteFGTS;
    
    this.parcelas = this.buscaTotalDeParcelas();
    this.finInvestimentoAportes = this.buscaTotalFinInvestimentoAportes();
    this.finInvestimentoRendimentos = this.buscaTotalFinInvestimentoRendimentos();
    // this.finFgtsAportes = TODO
    // this.finFgtsRendimentos = TODO
    // this.valorImovel = this.comparador.Financiamento().Prestacoes[this.comparador.Financiamento().Prestacoes.length-1].valorImovel;
    // this.disponibilidade = this.comparador.Financiamento().Usuario.disponivel;
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

  private buscaTotalDeParcelas(): number {
    return this.extratoAluguel.reduce((a,b) => a + b.Parcela,0);
  }

  private buscaTotalFinInvestimentoAportes(): number {
    return this.extratoAluguel.reduce((a,b) => a + b.DepositoFinInvestimento,0);
  }

  private buscaTotalFinInvestimentoRendimentos(): number {
    return this.extratoAluguel.reduce((a,b) => a + b.RendimentoFinInvestimento,0);
  }
}
