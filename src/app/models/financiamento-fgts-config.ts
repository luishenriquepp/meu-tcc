export class FinanciamentoFgtsConfig {
    private _entrada: boolean = true;
    private _posterior: Posterior = 2;

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

export enum Posterior{
    Parcelas = 2,
    SaldoDevedor = 1,
    NaoUsar = 0
}