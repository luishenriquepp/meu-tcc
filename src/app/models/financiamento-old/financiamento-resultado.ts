import {FinanciamentoFdc} from './financiamento-fdc';
import {FgtsFdc} from './fgts-fdc'
import {Financiamento} from './financiamento';


export class FinanciamentoResultado {
    private readonly _fin: Financiamento;
    private _parcelaTotal: number = 0;
    private _parcelaVPTotal: number = 0;
    private _patrimonioVPTotal: number = 0;
    private _variacaoTotal: number = 0;
    private _jurosTotal: number = 0;

    constructor(financiamento: Financiamento) {
        this._fin = financiamento;
    }
        
    get PrimeiraParcela(): number {
        return this._fin.Prestacoes[1].parcela;
    } 

    get UltimaParcela(): number {
        return this._fin.Prestacoes[this._fin.Prestacoes.length-1].parcela;
    }

    get ParcelaTotal(): number {
        return this._parcelaTotal;
    } 
    set ParcelaTotal(parcelaTotal: number) {
        this._parcelaTotal = parcelaTotal;
    }

    get ParcelaVPTotal(): number {
        return this._parcelaVPTotal;
    } 
    set ParcelaVPTotal(parcelaVPTOtal: number) {
        this._parcelaVPTotal = parcelaVPTOtal;
    }
    
    get JurosTotal(): number {
        return this._jurosTotal;
    } 
    set JurosTotal(juros: number) {
        this._jurosTotal = juros;
    }

    get Comprometimento(): number {
        return this.PrimeiraParcela/this._fin.Usuario.renda;
    } 

    get PatrimonioTotal(): number {
        return this._fin.Prestacoes[this._fin.Prestacoes.length-1].valorImovel;
    } 

    get PatrimonioVPTotal(): number {
        return this._patrimonioVPTotal+this._fin.Usuario.disponivel;
    } 

    get ValorLiquidoPresente(): number {
        return this.PatrimonioVPTotal-this._fin.Usuario.disponivel-this._parcelaVPTotal;
    } 

    get ValorLiquidoNominal(): number {
        return this.PatrimonioTotal-this._fin.Usuario.disponivel-this._parcelaTotal;
    } 

    public IncrementaParcela(fdc: FinanciamentoFdc): void {
        this._parcelaTotal += fdc.parcela;
        this._parcelaVPTotal += fdc.parcelaVP;
        this._jurosTotal += fdc.juros;
    }

    public IncrementaVariacao(fdc: FinanciamentoFdc, n): void {
        this._patrimonioVPTotal += fdc.before.vpVariacao;
        if(n == this._fin.Usuario.prestacoes) {
            this._patrimonioVPTotal += fdc.vpVariacao;
        }
    }

    public IncrementaFgts(fdc: FgtsFdc, n): void {
        this._variacaoTotal += fdc.VariacaoVP;
    }
}