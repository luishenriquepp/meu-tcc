import {ExtratoFinanciamento} from './extrato-financiamento';
import {Financiamento} from './financiamento';
import {Investimento} from '../aluguel/aluguel';
import {FinanciamentoFgtsConfig} from '../financiamento-fgts-config';

export class FgtsNoSaldoDevedor {

    private anualidade: number;
    public get Anualidade(): number {
        return this.anualidade;
    }
    
    constructor(fgtsConfig: FinanciamentoFgtsConfig) {
        if(fgtsConfig.Entrada) {
            this.anualidade = 2;
        } else {
            this.anualidade = 1;
        }
    }
    
    public ProcessarFgts(extrato: Array<ExtratoFinanciamento>, mes: number, fundo: Investimento, financiamento: Financiamento): void {
                             
        if(mes > 1 && (mes-1) % (this.anualidade * 12) == 0) {
            let valorResgatado = extrato[mes].MontanteFgts;
            
            if(extrato[mes].MontanteFgts > extrato[mes].SaldoAtual) {
                valorResgatado = extrato[mes].SaldoAtual;
            }
            fundo.Sacar(valorResgatado);
            financiamento.Abater(valorResgatado);
            
            extrato[mes].Resgate = valorResgatado;
            extrato[mes].SaldoAtual -= valorResgatado;
            extrato[mes].MontanteFgts -= valorResgatado;
            this.anualidade += 2;
        }
    }
}