import {Investimento} from '../aluguel/investimento';
import {Financiamento} from './financiamento';
import {ExtratoFinanciamento} from './extrato-financiamento';

export class FgtsDependency {
    private readonly extrato: Array<ExtratoFinanciamento>;
    public get Extrato(): Array<ExtratoFinanciamento> {
        return this.extrato;
    }
    private readonly financiamento: Financiamento;
    public get Financiamento(): Financiamento {
        return this.financiamento;
    }
    private readonly fundo: Investimento;
    public get Fundo(): Investimento {
        return this.fundo;
    }

    constructor(extrato: Array<ExtratoFinanciamento>, financiamento: Financiamento, fundo: Investimento) {
        this.extrato = extrato;
        this.financiamento = financiamento;
        this.fundo = fundo;
    }
}