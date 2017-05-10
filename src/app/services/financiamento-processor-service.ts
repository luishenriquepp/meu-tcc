import { Injectable } from '@angular/core';

import {Financiamento} from '../models/financiamento/financiamento';
import {ExtratoFinanciamento} from '../models/financiamento/extrato-financiamento';
import {Aluguel} from '../models/aluguel/aluguel';
import {Investimento} from '../models/aluguel/aluguel';
import {Usuario} from '../models/usuario';
import {ProcessadorFinanciamento} from '../models/financiamento/processador-financiamento';
import {ConfigurationService} from '../services/configuration-service';
import {FinanciamentoConfig} from '../models/financiamento-config';

@Injectable()
export class FinanciamentoProcessorService {

    constructor(private configuration: ConfigurationService) { }
    
    public Process(user: Usuario, config: FinanciamentoConfig): Array<ExtratoFinanciamento> {
        let global = this.configuration.Busca();

        let imovel = new Investimento(user.valorImovel, global.Imovel);
        let salario = new Aluguel(user.renda, user.crescimentoSalarial);
        
        //TODO calculate saldo devedor
        let fundo = new Investimento(0, global.Fundo);
        let financiamento = new Financiamento(0, global.Referencial);
        
        let processador = new ProcessadorFinanciamento(financiamento,imovel,salario,user,config);
        //TODO define IProcessFgts
        processador.Processar();

        return processador.Extrato;
    }
}