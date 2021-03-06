import {Parcela} from './parcela';
import {rowData} from '../../financiamento/extrato-fgts/extrato-fgts.component';

export  class ExtratoFinanciamento  implements rowData {
    
    private _mes: number = 0;
    public get Mes(): number {
        return this._mes;
    }
    public set Mes(v: number) {
        this._mes = v;
    }
    
    private _saldoAtual: number = 0;
    public get SaldoAtual(): number {
        return this._saldoAtual;
    }
    public set SaldoAtual(v: number) {
        this._saldoAtual = v;
    }
    
    private _correcaoTaxaReferencial: number = 0;
    public get CorrecaoTaxaReferencial(): number {
        return this._correcaoTaxaReferencial;
    }
    public set CorrecaoTaxaReferencial(v: number) {
        this._correcaoTaxaReferencial = v;
    }
    
    private _parcela: Parcela;
    public get Parcela(): Parcela {
        return this._parcela;
    }
    public set Parcela(v: Parcela) {
        this._parcela = v;
    }
    
    private _valorImovel: number = 0;
    public get ValorImovel() : number {
        return this._valorImovel;
    }
    public set ValorImovel(v : number) {
        this._valorImovel = v;
    }

    public Patrimonio(): number {
        return this._valorImovel - this._saldoAtual;
    }
    
    private _depositoFgts: number = 0;
    public get DepositoFgts(): number {
        return this._depositoFgts;
    }
    public set DepositoFgts(v: number) {
        this._depositoFgts = v;
    }
    
    private _rendimentoFgts: number = 0;
    public get RendimentoFgts() : number {
        return this._rendimentoFgts;
    }
    public set RendimentoFgts(v : number) {
        this._rendimentoFgts = v;
    }
    
    private _resgate: number = 0;
    public get Resgate() : number {
        return this._resgate;
    }
    public set Resgate(v : number) {
        this._resgate = v;
    }
    
    private _montanteFgts: number = 0;
    public get MontanteFgts() : number {
        return this._montanteFgts;
    }
    public set MontanteFgts(v: number) {
        this._montanteFgts = v;
    }

    private _saldo: number = 0;
    public get Saldo() : number {
        return this._saldo;
    }
    public set Saldo(v: number) {
        this._saldo = v;
    }
        
    public PatrimonioTotal(): number {
        return this.Patrimonio() + this._montanteFgts;
    }

    public FgtsSaldoInicial(): number {
        return this._montanteFgts + this._resgate - this._depositoFgts - this._rendimentoFgts;
    }

    public TaxaAdministrativa(): number {
        return this._parcela.TaxaAdministrativa();
    }

    public Juros(): number {
        return this._parcela.Juros;
    }

    public Amortizacao(): number {
        return this._parcela.Amortizacao;
    }

    public ParcelaDescontada(): number {
        return this._parcela.ParcelaDescontada();
    }

    public Seguro(): number {
        return this._parcela.Seguros;
    }
}