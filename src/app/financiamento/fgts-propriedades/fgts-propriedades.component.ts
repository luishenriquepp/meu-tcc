import { Component, Input, OnInit } from '@angular/core';
import {PercentPipe} from '@angular/common';
import {FinanciamentoFgtsConfig} from '../../models/financiamento-fgts-config';
import {Posterior} from '../../models/financiamento-fgts-config';
import {MaskService} from '../../services/mask-service';

@Component({
  selector: 'fgts-propriedades',
  templateUrl: './fgts-propriedades.component.html',
  providers: [MaskService, PercentPipe]
})
export class FgtsPropriedadesComponent implements OnInit {
  
  @Input() fgtsConfig: FinanciamentoFgtsConfig;
  
  constructor(
    private maskService: MaskService,
    private pipe: PercentPipe) { }

  private nMask = this.maskService.numberMask;
  private pMask = this.maskService.percentMask;

  private fgts: string;
  public set Fgts(value: string) {
    if(value) {
      this.fgtsConfig.Fgts = this.maskService.ConvertToNumber(value);
    }
  }
  public get Fgts(): string {
    return this.fgts;
  }

  private crescimentoSalarial: string;
  public set CrescimentoSalarial(value: string) {
      if(value) {
        this.fgtsConfig.CrescimentoSalarial = this.maskService.ConvertToFloat(value);
      }
  }
  public get CrescimentoSalarial(): string {
    return this.crescimentoSalarial;
  }

  ngOnInit(): void {
    this.fgts = this.fgtsConfig.Fgts.toString();
    this.crescimentoSalarial = this.pipe.transform(this.fgtsConfig.CrescimentoSalarial);
  }
  
  onChangePosterior(value: string): void {
    if(value == '0') {
      this.fgtsConfig.Posterior = Posterior.NaoUsar;
    } else if (value == '1') {
      this.fgtsConfig.Posterior = Posterior.SaldoDevedor;
    } else if (value == '2') {
      this.fgtsConfig.Posterior = Posterior.Parcelas;
    }
  }
}
