import { Component, OnChanges, Input } from '@angular/core';

import {ExtratoFinanciamento} from '../../models/financiamento/extrato-financiamento';
import {ExtratoAluguel} from '../../models/aluguel/extrato-aluguel';
import {Usuario} from '../../models/usuario';
import {FinanciamentoFgtsConfig} from '../../models/financiamento-fgts-config';
import {Posterior} from '../../models/financiamento-fgts-config';

@Component({
  selector: 'resultado-parcial',
  templateUrl: './resultado-parcial.component.html',
  styleUrls: ['./resultado-parcial.component.css']
})
export class ResultadoParcialComponent implements OnChanges {
  @Input() extratoAluguel: Array<ExtratoAluguel>;
  @Input() extrato: Array<ExtratoFinanciamento>;
  @Input() user: Usuario;
  @Input() fgtsConfig: FinanciamentoFgtsConfig;
  @Input() checkExpandir: boolean = false;

  private collapsed: boolean = false;

  private collapse(): string {
    let panel: string = 'panel-collapse';
    return this.collapsed ? panel+ ' collapse in' : panel+' collapse';
  } 

  private valorImovel: number = 0;
  private parcelas: number = 0;
  private fgtsAportesCusto: number = 0;
  private fgtsRendimentosCusto: number = 0;
  private fgtsAportesPatrimonio: number = 0;
  private fgtsRendimentosPatrimonio: number = 0;
  private fgtsEntrada: number = 0;
  private investimentoAportesPatrimonio: number = 0;
  private investimentoRendimentosPatrimonio: number = 0;
  private investimentoAportesCusto: number = 0;

  ngOnChanges(): void {
    this.clear();
    this.calculateResult();
  }

  private calculateResult(): void {
    this.initialize();
    let aportes = this.extrato.reduce((a,b) => a + b.DepositoFgts, 0);
    let rendimentos = this.extrato.reduce((a,b) => a + b.RendimentoFgts, 0);

    if(this.user.usaFGTS) {
      
      if(this.fgtsConfig.Entrada) {
        this.fgtsEntrada = this.fgtsConfig.Fgts;
      }
      
      if(this.fgtsConfig.Posterior == Posterior.NaoUsar) {
      
        this.fgtsAportesPatrimonio = aportes;
        this.fgtsRendimentosPatrimonio = rendimentos;
        this.fgtsAportesCusto = aportes;

      } else if (this.fgtsConfig.Posterior == Posterior.SaldoDevedor) {

        this.fgtsAportesCusto = aportes;
        this.fgtsRendimentosCusto = rendimentos;

      } else if (this.fgtsConfig.Posterior == Posterior.Parcelas) {

        this.fgtsAportesCusto = aportes;
        this.fgtsRendimentosCusto = rendimentos;

      }

      if(this.extratoAluguel) {
        this.investimentoAportesPatrimonio = this.extratoAluguel.reduce((a,b) => a + b.DepositoFinInvestimento, 0);
        this.investimentoRendimentosPatrimonio = this.extratoAluguel.reduce((a,b) => a + b.RendimentoFinInvestimento, 0);
        this.investimentoAportesCusto = this.investimentoAportesPatrimonio;
      }
    }
  }

  private initialize() {
    this.valorImovel = this.extrato[this.extrato.length-1].ValorImovel;
    
    if(this.fgtsConfig.Posterior == Posterior.Parcelas) {
      this.parcelas = this.extrato.reduce((a,b) => a + b.Parcela.ParcelaDescontada(),0);
    } else {
      this.parcelas = this.extrato.reduce((a,b) => a + b.Parcela.Parcela(),0);
    }
  }

  private clear(): void {
      this.valorImovel = 0;
      this.parcelas = 0;
      this.fgtsAportesCusto = 0;
      this.fgtsRendimentosCusto = 0;
      this.fgtsAportesPatrimonio = 0;
      this.fgtsRendimentosPatrimonio = 0;
      this.fgtsEntrada = 0;
      this.investimentoAportesPatrimonio = 0;
      this.investimentoRendimentosPatrimonio = 0;
      this.investimentoAportesCusto = 0;
  }

  public Patrimonio(): number {
    return this.valorImovel + this.FgtsPatrimonio() + this.InvestimentoTotal();
  }

  public Custo(): number {
    return this.parcelas + +this.user.disponivel + this.fgtsEntrada + this.FgtsCusto() + this.investimentoAportesCusto;
  }

  public FgtsPatrimonio(): number {
    return this.fgtsAportesPatrimonio + this.fgtsRendimentosPatrimonio;
  }

  public FgtsCusto(): number {
    return this.fgtsAportesCusto + this.fgtsRendimentosCusto;
  }

  public PatrimonioLiquido(): number {
    return this.Patrimonio() - this.Custo();
  }

  public InvestimentoTotal(): number {
    return this.investimentoRendimentosPatrimonio + this.investimentoAportesPatrimonio;
  }
}