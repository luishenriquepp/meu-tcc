import { Injectable } from '@angular/core';

import {Financiamento} from '../models/financiamento/financiamento';
import {ExtratoFinanciamento} from '../models/financiamento/extrato-financiamento';
import {Aluguel} from '../models/aluguel/aluguel';
import {Investimento} from '../models/aluguel/investimento';
import {Usuario} from '../models/usuario';
import {ProcessadorFinanciamento} from '../models/financiamento/processador-financiamento';
import {ConfigurationService} from '../services/configuration-service';
import {FinanciamentoConfig} from '../models/financiamento-config';
import {FinanciamentoSeguro} from '../models/financiamento-seguro';
import {Posterior} from '../models/financiamento-fgts-config';
import {FgtsNasParcelas} from '../models/financiamento/fgts-nas-parcelas';
import {FgtsNoSaldoDevedor} from '../models/financiamento/fgts-no-saldo-devedor';
import {FgtsNaoUsarMais} from '../models/financiamento/fgts-nao-usar-mais';
import {AdvancedProperties} from '../models/financiamento/advanced-properties';
import {Seguradora} from '../models/financiamento-config';
import {SeguradoraHdi} from '../models/seguradora-hdi';
import {SeguradoraSa} from '../models/seguradora-sa';

@Injectable()
export class FinanciamentoProcessorService {

    constructor(private configuration: ConfigurationService) { }
    
    public Process(properties: AdvancedProperties): Array<ExtratoFinanciamento> {
        let global = this.configuration.Busca();
        properties.GlobalConfiguration = global;

        let imovel = new Investimento(properties.ValorImovel(), global.Imovel);
        let salario = new Aluguel(properties.Renda(), properties.CrescimentoSalarial());        
        let fundo = new Investimento(properties.Fgts(), global.Fundo);
        let financiamento = new Financiamento(properties.ValorImovel(), global.Referencial);
        
        let processador = new ProcessadorFinanciamento(financiamento,imovel,salario,properties,fundo);

        if(properties.Seguradora() == Seguradora.HDI) {
            properties.Seguro = new FinanciamentoSeguro(new SeguradoraHdi());
        } else if (properties.Seguradora() == Seguradora.SULAMERICA) {
            properties.Seguro = new FinanciamentoSeguro(new SeguradoraSa());
        }
        
        if(properties.Posterior() == Posterior.Parcelas) {
            processador.Processor = new FgtsNasParcelas();
        } else if (properties.Posterior() == Posterior.SaldoDevedor) {
            processador.Processor = new FgtsNoSaldoDevedor(properties.UsaComoEntrada());
        } else {
            processador.Processor = new FgtsNaoUsarMais();
        }

        processador.Processar();

        return processador.Extrato;
    }
}