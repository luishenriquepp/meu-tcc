import { Component, OnInit, Input } from '@angular/core';

import {ExtratoFinanciamento} from '../../models/financiamento/extrato-financiamento';
import {Usuario} from '../../models/usuario';
import {FinanciamentoFgtsConfig} from '../../models/financiamento-fgts-config';
import {Posterior} from '../../models/financiamento-fgts-config';

@Component({
  selector: 'resultado-parcial',
  templateUrl: './resultado-parcial.component.html',
  styleUrls: ['./resultado-parcial.component.css']
})
export class ResultadoParcialComponent implements OnInit {
  @Input() extrato: Array<ExtratoFinanciamento>;
  @Input() user: Usuario;
  @Input() fgtsConfig: FinanciamentoFgtsConfig;

  private valorImovel: number = 0;
  private parcelas: number = 0;
  private fgtsAportesCusto: number = 0;
  private fgtsRendimentosCusto: number = 0;
  private fgtsAportesPatrimonio: number = 0;
  private fgtsRendimentosPatrimonio: number = 0;
  private fgtsEntrada: number = 0;

  ngOnInit(): void {
    
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

  public Patrimonio(): number {
    return this.valorImovel + this.FgtsPatrimonio();
  }

  public Custo(): number {
    return this.parcelas + +this.user.disponivel + this.fgtsEntrada + this.FgtsCusto();
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
}