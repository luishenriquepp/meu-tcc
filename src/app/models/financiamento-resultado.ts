import { FinanciamentoFdc } from './financiamento-fdc';
import { Usuario } from './usuario';

export class FinanciamentoResultado {
    private _usuario: Usuario;
    private _parcelaTotal: number = 0;
    private _parcelaVPTotal: number = 0;
    private _patrimonioVPTotal: number = 0;
    private _variacaoTotal: number = 0;
    private _parcelas: FinanciamentoFdc[];
    
    set Usuario(usuario: Usuario) {
        this._usuario = usuario;
    }
    
    get PrimeiraParcela(): number {
        return this._parcelas[1].parcela;
    } 

    get UltimaParcela(): number {
        return this._parcelas[this._parcelas.length-1].parcela;
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

    get Comprometimento(): number {
        return this.PrimeiraParcela/this._usuario.renda;
    } 

    get PatrimonioTotal(): number {
        return this._parcelas[this._parcelas.length-1].valorImovel;
    } 

    get PatrimonioVPTotal(): number {
        return this._patrimonioVPTotal;
    } 

    get ValorLiquidoPresente(): number {
        return this._patrimonioVPTotal-this._usuario.disponivel-this._parcelaVPTotal;
    } 

    get ValorLiquidoNominal(): number {
        return this.PatrimonioTotal-this._usuario.disponivel-this._parcelaTotal;
    } 

    public IncrementaParcela(fdc: FinanciamentoFdc): void {
        this._parcelaTotal += fdc.parcela;
        this._parcelaVPTotal += fdc.parcelaVP;
        this._patrimonioVPTotal += fdc.vpVariacao;
    }

    set Parcela(parcela: FinanciamentoFdc[]) {
        this._parcelas = parcela;
    }     
}
