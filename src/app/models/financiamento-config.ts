import {FinancialMath} from '../utils/financial-math';

export class FinanciamentoConfig {
    
    private _taxaAdm: number = 25;
    private _jurosAnuais: number = 0.11;
    private _seguradora: Seguradora = Seguradora.SULAMERICA;
    
    get TaxaAdministrativa(): number {
        return this._taxaAdm;
    } 

    set TaxaAdministrativa(taxaAdm: number) {
        this._taxaAdm = taxaAdm;
    }

    get JurosMensais(): number {
        return FinancialMath.YearToMonth(this._jurosAnuais);
    }

    get JurosAnuais(): number {
        return this._jurosAnuais;
    }

    set JurosAnuais(juros: number) {
        this._jurosAnuais = juros;
    }
    
    get Seguradora(): Seguradora {
        return this._seguradora;
    }

    set Seguradora(seguradora: Seguradora) {
        this._seguradora = seguradora;
    }
}

export enum Seguradora {
    HDI = 0,
    SULAMERICA = 1
}
