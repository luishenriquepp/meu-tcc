export class ExtratoInvestimento {
    constructor(deposito: number, rendimento: number) {
        this._deposito = deposito;
        this._rendimento = rendimento;
    }
    
    private _deposito : number;
    public get Deposito() : number {
        return this._deposito;
    }
        
    private _rendimento : number;
    public get Rendimento() : number {
        return this._rendimento;
    }    
}