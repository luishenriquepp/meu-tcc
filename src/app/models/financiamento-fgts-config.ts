export class FinanciamentoFgtsConfig {
    private _entrada: boolean = false;
    private _posterior: Posterior = 0;
    private _fgts: number = 0;
    private _crescimentoSalarial = 0.07;

    public get Entrada(): boolean {
        return this._entrada;        
    }

    public set Entrada(entrada: boolean) {
        this._entrada = entrada;
    }

    public get Fgts(): number {
        return this._fgts;        
    }

    public set Fgts(fgts: number) {
        this._fgts = fgts;
    }

    public get CrescimentoSalarial(): number {
        return this._crescimentoSalarial;        
    }

    public set CrescimentoSalarial(crescimento: number) {
        this._crescimentoSalarial = crescimento;
    }

    public get Posterior(): Posterior {
        return this._posterior;        
    }

    public set Posterior(posterior: Posterior) {
        this._posterior = posterior;
    }
}

export enum Posterior {
    NaoUsar = 0,
    SaldoDevedor = 1,
    Parcelas = 2
}