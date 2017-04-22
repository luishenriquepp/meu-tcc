export class GlobalConfiguration {
    
    private _referencial : number;
    public get Referencial() : number {
        return this._referencial;
    }
    public set Referencial(v : number) {
        this._referencial = v;
    }
        
    private _interna : number;
    public get Interna() : number {
        return this._interna;
    }
    public set Interna(v : number) {
        this._interna = v;
    }
    
    private _rentabilidade : number;
    public get Rentabilidade() : number {
        return this._rentabilidade;
    }
    public set Rentabilidade(v : number) {
        this._rentabilidade = v;
    }
    
    private _imovel : number;
    public get Imovel() : number {
        return this._imovel;
    }
    public set Imovel(v : number) {
        this._imovel = v;
    }
    
    private _fundo : number;
    public get Fundo() : number {
        return this._fundo;
    }
    public set Fundo(v : number) {
        this._fundo = v;
    }        
}