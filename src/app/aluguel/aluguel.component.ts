import {Component,OnInit} from '@angular/core';
import {ExtratoAluguel} from '../models/aluguel/extrato-aluguel';
import {FinanciamentoService} from '../services/financiamento-services';
import {IIdentifier} from '../models/i-identifier';
import {Aluguel} from '../models/aluguel/aluguel';
import {Comparador} from '../models/aluguel/comparador';
import {Investimento} from '../models/aluguel/investimento';
import {GlobalConfiguration} from '../models/global-configuration';
import {ConfigurationService} from '../services/configuration-service';
import {FinanciamentoProcessorService} from '../services/financiamento-processor-service';
import {AdvancedProperties} from '../models/financiamento/advanced-properties';

@Component({
  selector: 'app-aluguel',
  templateUrl: './aluguel.component.html',
  styleUrls: ['./aluguel.component.css'],
  providers: [ConfigurationService, FinanciamentoProcessorService]
})
export class AluguelComponent implements OnInit {

  private extratoAluguel: Array<ExtratoAluguel>;
  private calculado: boolean = false;
  private fluxoDeCaixa: boolean = false;
  private grafico: boolean = false;
  private globalConfiguration: GlobalConfiguration;
  private resultado: boolean = false;
  private comparador: Comparador;

  constructor(
    private configurationService: ConfigurationService,
    private financiamentoProcessorService: FinanciamentoProcessorService) { }

  ngOnInit(): void {
    this.globalConfiguration = this.configurationService.Busca();
  }

  private onComparar(event: any): void {
    let investimento = new Investimento(event.fin.Disponivel(), this.globalConfiguration.RentabilidadeLiquidaMensal());
    let aluguel = new Aluguel(event.aluguelInicial, this.globalConfiguration.Aluguel);
    let fgts = new Investimento(event.fin.Fgts(), this.globalConfiguration.Fundo);
    let investimentoFinanciamento = new Investimento(0, this.globalConfiguration.RentabilidadeLiquidaMensal());
    let salario = new Aluguel(event.fin.Renda(), event.fin.CrescimentoSalarial());
    
    let extratoFinanciamento = this.financiamentoProcessorService.Process(event.fin);

    this.comparador = new Comparador(investimento, aluguel, extratoFinanciamento, investimentoFinanciamento, salario, fgts);
    this.comparador.Processar();

    this.extratoAluguel = this.comparador.Gerenciador.ExtratoAluguel;
    this.calculado = true;
    this.grafico = true;
  }
  private exibeFluxoDeCaixa(): void {
    this.grafico = false;
    this.resultado = false;
    this.fluxoDeCaixa = true;
  }
  private exibeGrafico(): void {
    this.fluxoDeCaixa = false;
    this.resultado = false;
    this.grafico = true;
  }
  private exibeResultado(): void {
    this.fluxoDeCaixa = false;
    this.grafico = false;
    this.resultado = true;
  }
}
