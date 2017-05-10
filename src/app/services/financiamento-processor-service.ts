import { Injectable } from '@angular/core';

import {Financiamento} from '../models/financiamento/financiamento';
import {ExtratoFinanciamento} from '../models/financiamento/extrato-financiamento';
import {Aluguel} from '../models/aluguel/aluguel';
import {Investimento} from '../models/aluguel/aluguel';
import {Usuario} from '../models/usuario';
import {ProcessadorFinanciamento} from '../models/financiamento/processador-financiamento';
import {ConfigurationService} from '../services/configuration-service';
import {FinanciamentoConfig} from '../models/financiamento-config';
import {Posterior} from '../models/financiamento-fgts-config';
import {FgtsNasParcelas} from '../models/financiamento/fgts-nas-parcelas';
import {FgtsNoSaldoDevedor} from '../models/financiamento/fgts-no-saldo-devedor';

@Injectable()
export class FinanciamentoProcessorService {

    constructor(private configuration: ConfigurationService) { }
    
    public Process(user: Usuario, config: FinanciamentoConfig): Array<ExtratoFinanciamento> {
        let global = this.configuration.Busca();
        user.GlobalConfiguration = global;

        let imovel = new Investimento(user.valorImovel, global.Imovel);
        let salario = new Aluguel(user.renda, user.crescimentoSalarial);        
        let fundo = new Investimento(user.FGTS, global.Fundo);
        let financiamento = new Financiamento(user.valorImovel, global.Referencial);
        
        let processador = new ProcessadorFinanciamento(financiamento,imovel,salario,user,config, fundo);

        if(config.FGTSConfig.Posterior == Posterior.Parcelas) {
            processador.Processor = new FgtsNasParcelas();
        } else if (config.FGTSConfig.Posterior == Posterior.SaldoDevedor) {
            processador.Processor = new FgtsNoSaldoDevedor(config.FGTSConfig);
        }

        processador.Processar();

        return processador.Extrato;
    }
}