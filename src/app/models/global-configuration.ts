import {FinancialMath} from '../utils/financial-math';

export class GlobalConfiguration {
    private _referencial : number = 0.001708;
    public get Referencial() : number {
        return this._referencial;
    }
    public set Referencial(v : number) {
        this._referencial = v;
    }
        
    private _interna : number = 0.00848891;
    public get Interna() : number {
        return this._interna;
    }
    public set Interna(v : number) {
        this._interna = v;
    }
    
    private _rentabilidade : number = 0.11;
    public get Rentabilidade() : number {
        return this._rentabilidade;
    }
    public set Rentabilidade(v : number) {
        this._rentabilidade = v;
    }
    
    private _imovel : number = 0.001;
    public get Imovel() : number {
        return this._imovel;
    }
    public set Imovel(v : number) {
        this._imovel = v;
    }
    
    private _fundo : number = 0.003;
    public get Fundo() : number {
        return this._fundo;
    }
    public set Fundo(v : number) {
        this._fundo = v;
    }
    
    private _aluguel : number = 0.08;
    public get Aluguel() : number {
        return this._aluguel;
    }
    public set Aluguel(v : number) {
        this._aluguel = v;
    }
    
    private _impostoRenda : number  = 0.017;
    public get ImpostoRenda() : number {
        return this._impostoRenda;
    }
    public set ImpostoRenda(v : number) {
        this._impostoRenda = v;
    }

    public RentabilidadeLiquida(): number {
        return (this._rentabilidade*(1-this._impostoRenda));
    }

    public RentabilidadeLiquidaMensal(): number {
        return FinancialMath.YearToMonth(this._rentabilidade);
    }      
}