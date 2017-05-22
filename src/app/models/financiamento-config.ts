export class FinanciamentoConfig {
    
    private _taxaAdm: number = 25;
    private _seguradora: Seguradora = Seguradora.SULAMERICA;
    
    get TaxaAdministrativa(): number {
        return this._taxaAdm;
    } 

    set TaxaAdministrativa(taxaAdm: number) {
        this._taxaAdm = taxaAdm;
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
