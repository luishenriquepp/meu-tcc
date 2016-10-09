import { FinanciamentoSeguro } from './financiamento-seguro';

export class FinanciamentoConfig {
    
    private _seguro: FinanciamentoSeguro;
    private _taxaAdm: number = 25;
    private _jurosMensais: number = 0.0090;
    private _trMensal: number = 0.001709;
    private _rentabilidade: number = 0.00948891;

    get TaxaAdministrativa(): number {
        return this._taxaAdm;
    } 

    set TaxaAdministrativa(taxaAdm: number) {
        this._taxaAdm = taxaAdm;
    }

    get Seguro(): FinanciamentoSeguro {
        return this._seguro;
    } 

    set Seguro(seguro: FinanciamentoSeguro) {
        this._seguro = seguro;
    }

    get Rentabilidade(): number {
        return this._rentabilidade;
    } 

    set Rentabilidade(rentabilidade: number) {
        this._rentabilidade = rentabilidade;
    }

    get JurosMensais(): number {
        return this._jurosMensais;
    }

    set JurosMensais(juros: number) {
        this._jurosMensais = juros;
    }

    get TRMensal(): number {
        return this._trMensal;
    }

    set TRMensal(tr: number) {
        this._trMensal = tr;
    }
}
