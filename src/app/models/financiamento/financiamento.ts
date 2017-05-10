import {Investimento,Aluguel} from '../aluguel/aluguel';
import {Usuario} from '../usuario';
import {GlobalConfiguration} from '../global-configuration';
import {FinanciamentoConfig} from '../financiamento-config';
import {FgtsNasParcelas} from './fgts-nas-parcelas';

export class Financiamento {
    private readonly _taxaReferencial: number;        
    
    private _saldoDevedor: number;
    public get SaldoDevedor(): number {
        return this._saldoDevedor;
    }
    
    private _correcaoTaxaReferencial : number;
    public get CorrecaoTaxaReferencial(): number {
        return this._correcaoTaxaReferencial;
    }
    
    constructor(saldoDevedorInicial: number, taxaReferencial: number) {
        this._saldoDevedor = saldoDevedorInicial;
        this._taxaReferencial = taxaReferencial;
    }
    
    public Corrigir(): void {
        this._correcaoTaxaReferencial = this._saldoDevedor * this._taxaReferencial;
        this._saldoDevedor += this._correcaoTaxaReferencial;
    }

    public Pagar(amortizacao: number) {
        this._saldoDevedor -= amortizacao;
    }

    public Abater(valor: number) {
        this._saldoDevedor -= valor;
    }
}