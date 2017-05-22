import {Component} from '@angular/core';
import {ExtratoAluguel} from '../models/aluguel/extrato-aluguel';
import {FinanciamentoService} from '../services/financiamento-services';
import {IIdentifier} from '../models/i-identifier';
import {Aluguel} from '../models/aluguel/aluguel';
import {Comparador} from '../models/aluguel/comparador';
import {Investimento} from '../models/aluguel/investimento';
import {FinanciamentoProcessorService} from '../services/financiamento-processor-service';
import {AdvancedProperties} from '../models/financiamento/advanced-properties';
import {Usuario} from '../models/usuario';
import {FinanciamentoFgtsConfig} from '../models/financiamento-fgts-config';
import {AluguelDto} from '../models/aluguel/aluguel-dto';
import {FinancialMath} from '../utils/financial-math';

@Component({
  selector: 'app-aluguel',
  templateUrl: './aluguel.component.html',
  styleUrls: ['./aluguel.component.css'],
  providers: [FinanciamentoProcessorService]
})
export class AluguelComponent {

  private extratoAluguel: Array<ExtratoAluguel>;
  private calculado: boolean = false;
  private fluxoDeCaixa: boolean = false;
  private grafico: boolean = false;
  private resultado: boolean = false;
  private comparador: Comparador;
  private fgtsConfig: FinanciamentoFgtsConfig;
  private user: Usuario;

  constructor(private financiamentoProcessorService: FinanciamentoProcessorService) { }

  private onComparar(aluguelDto: AluguelDto): void {
    this.propertyToUserToFgtsConfig(aluguelDto.property);
    let investimento = new Investimento(aluguelDto.property.Disponivel(), aluguelDto.configuration.RentabilidadeLiquidaMensal());
    let aluguel = new Aluguel(aluguelDto.aluguelInicial, aluguelDto.configuration.Aluguel);
    let investimentoFinanciamento = new Investimento(0, aluguelDto.configuration.RentabilidadeLiquidaMensal());
    let salario = new Aluguel(aluguelDto.property.Renda(), aluguelDto.property.CrescimentoSalarial());
    let fgts: Investimento;
    if(this.user.usaFGTS) { fgts =  new Investimento(aluguelDto.property.Fgts(), FinancialMath.YearToMonth(aluguelDto.configuration.Fundo)) };
    
    let extratoFinanciamento = this.financiamentoProcessorService.Process(aluguelDto.property);

    this.comparador = new Comparador(investimento, aluguel, extratoFinanciamento, investimentoFinanciamento, salario, fgts);
    this.comparador.Processar();

    this.extratoAluguel = this.comparador.Gerenciador.ExtratoAluguel;
    this.calculado = true;
    this.resultado = true;
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

  private propertyToUserToFgtsConfig(property: AdvancedProperties): void {
    this.user = new Usuario();
    this.user.disponivel = property.Disponivel();
    this.user.usaFGTS = property.UsaFgts();
    this.fgtsConfig = new FinanciamentoFgtsConfig();
    this.fgtsConfig.Posterior = property.Posterior();
    this.fgtsConfig.Entrada = property.UsaComoEntrada();
    this.fgtsConfig.Fgts = property.Fgts();
  }
}
