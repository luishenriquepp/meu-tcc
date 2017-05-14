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
  private patrimonioTotal: number = 0;
  private custoTotal: number = 0;
  private patrimonioLiquido: number = 0;
  private aportesFgts: number = 0;
  private rendimentosFgts: number = 0;
  private fgtsTotal: number = 0;
  private fgtsEntrada: number = 0;

  ngOnInit(): void {
    if(this.user.usaFGTS) {
      if(this.fgtsConfig.Entrada) {
        this.fgtsEntrada = this.fgtsConfig.Fgts;
        this.custoTotal += this.fgtsEntrada;
      }
      if(this.fgtsConfig.Posterior == Posterior.NaoUsar) {
        this.aportesFgts = this.extrato.reduce((a,b) => a + b.DepositoFgts,0);
        this.rendimentosFgts = this.extrato.reduce((a,b) => a + b.RendimentoFgts,0);
        this.fgtsTotal = this.aportesFgts + this.rendimentosFgts;
      }
    }
    
    this.valorImovel = this.extrato[this.extrato.length-1].ValorImovel;
    this.parcelas = this.extrato.reduce((a,b) => a + b.Parcela.Parcela(),0);
    this.patrimonioTotal = this.valorImovel + this.fgtsTotal;
    this.custoTotal += this.parcelas + this.user.disponivel + this.aportesFgts;
    this.patrimonioLiquido = this.patrimonioTotal - this.custoTotal;
  }

}