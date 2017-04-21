export class FinanciamentoFgtsConfig {
    private _entrada: boolean = false;
    private _posterior: Posterior = 1;

    get Entrada(): boolean {
        return this._entrada;        
    }

    set Entrada(entrada: boolean) {
        this._entrada = entrada;
    }

    get Posterior(): Posterior {
        return this._posterior;        
    }

    set Posterior(posterior: Posterior) {
        this._posterior = posterior;
    }
}

export enum Posterior {
    NaoUsar = 0,
    SaldoDevedor = 1,
    Parcelas = 2
}