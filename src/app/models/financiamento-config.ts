import { FinanciamentoSeguro } from './financiamento-seguro';
import { FinanciamentoFgtsConfig } from './financiamento-fgts-config';

export class FinanciamentoConfig {
    
    private _seguro: FinanciamentoSeguro;
    private _config: FinanciamentoFgtsConfig;
    private _taxaAdm: number = 25;
    private _jurosAnuais: number = 0.11;

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

    get JurosMensais(): number {
        return this._jurosAnuais/12;
    }

    get JurosAnuais(): number {
        return this._jurosAnuais;
    }

    set JurosAnuais(juros: number) {
        this._jurosAnuais = juros;
    }
}
