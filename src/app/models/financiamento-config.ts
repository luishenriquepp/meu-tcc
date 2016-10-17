import { FinanciamentoSeguro } from './financiamento-seguro';
import { FinanciamentoFgtsConfig } from './financiamento-fgts-config';

export class FinanciamentoConfig {
    
    private _seguro: FinanciamentoSeguro;
    private _config: FinanciamentoFgtsConfig;
    private _taxaAdm: number = 25;
    private _jurosMensais: number = 0.0090;
    private _trMensal: number = 0.001709;
    private _rentabilidade: number = 0.00948891;

    constructor(config: FinanciamentoFgtsConfig) {
        this._config = config;
    }

    get FGTSConfig(): FinanciamentoFgtsConfig {
        return this._config;
    } 

    set FGTSConfig(config: FinanciamentoFgtsConfig) {
        this._config = config;
    }    
    
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
