import {IIdentifier} from './i-identifier';
import {FinancialMath} from '../utils/financial-math';

export class GlobalConfiguration implements IIdentifier {
    public Id: number;
    public Identificacao: string;
    public Descricao: string;

    private _referencial: number;
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
    
    private _imovel: number;
    public get Imovel() : number {
        return this._imovel;
    }
    public set Imovel(v : number) {
        this._imovel = v;
    }
    
    private _fundo: number;
    public get Fundo(): number {
        return this._fundo;
    }
    public set Fundo(v : number) {
        this._fundo = v;
    }
    
    private _aluguel: number;
    public get Aluguel() : number {
        return this._aluguel;
    }
    public set Aluguel(v : number) {
        this._aluguel = v;
    }
    
    private _impostoRenda: number;
    public get ImpostoRenda() : number {
        return this._impostoRenda;
    }
    public set ImpostoRenda(v : number) {
        this._impostoRenda = v;
    }

    private _juros: number;
    public get Juros() : number {
        return this._juros;
    }
    public set Juros(v : number) {
        this._juros = v;
    }

    public RentabilidadeLiquida(): number {
        return (this._rentabilidade*(1-this._impostoRenda));
    }

    public RentabilidadeLiquidaMensal(): number {
        return FinancialMath.YearToMonth(this._rentabilidade);
    }      
}