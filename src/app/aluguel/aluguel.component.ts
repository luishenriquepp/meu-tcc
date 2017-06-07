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
import {AluguelConfig} from '../models/aluguel/aluguel-config';
import {FinancialMath} from '../utils/financial-math';
import {ExtratoFinanciamento} from '../models/financiamento/extrato-financiamento';

@Component({
  selector: 'app-aluguel',
  templateUrl: './aluguel.component.html',
  styleUrls: ['./aluguel.component.css'],
  providers: [FinanciamentoProcessorService]
})
export class AluguelComponent {

  private extratoAluguel: Array<ExtratoAluguel>;
  private extratoFinanciamento: Array<ExtratoFinanciamento>;
  private calculado: boolean = false;
  private selected: string = 'r';
  private comparador: Comparador;
  private fgtsConfig: FinanciamentoFgtsConfig;
  private user: Usuario;

  constructor(private financiamentoProcessorService: FinanciamentoProcessorService) { }

  private onComparar(aluguelConfig: AluguelConfig): void {    
    this.selected = 'r';
    this.propertyToUserToFgtsConfig(aluguelConfig.property);
    let investimento = new Investimento(aluguelConfig.property.Disponivel(), aluguelConfig.configuration.RentabilidadeLiquidaMensal());
    let aluguel = new Aluguel(aluguelConfig.aluguelInicial, aluguelConfig.configuration.Aluguel);
    let investimentoFinanciamento = new Investimento(0, aluguelConfig.configuration.RentabilidadeLiquidaMensal());
    let salario = new Aluguel(aluguelConfig.property.Renda(), aluguelConfig.property.CrescimentoSalarial());
    let fgts: Investimento;
    if(this.user.usaFGTS) { fgts =  new Investimento(aluguelConfig.property.Fgts(), FinancialMath.YearToMonth(aluguelConfig.configuration.Fundo)) };
    
    this.extratoFinanciamento = this.financiamentoProcessorService.Process(aluguelConfig.property);

    this.comparador = new Comparador(investimento, aluguel, this.extratoFinanciamento, investimentoFinanciamento, salario, fgts);
    this.comparador.compensar = aluguelConfig.compensar;
    this.comparador.Processar();

    this.extratoAluguel = this.comparador.Gerenciador.ExtratoAluguel;
    this.calculado = true;
  }

  private changeScreen(value: string) {
    this.selected = value;
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
