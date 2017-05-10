import { Usuario } from '../usuario';
import { FinanciamentoConfig } from'../financiamento-config';

export class FgtsFdc {
    private _saldo: number = 0;
    private _correcaoTR: number = 0;
    private _creditos: number = 0;
    private _resgate: number = 0;
    private _totalFGTS: number = 0;
    private _fgtsVaricao: number = 0;
    private _variacaoVP: number = 0;
    private _before: FgtsFdc;

    private _usuario: Usuario;
    private _config: FinanciamentoConfig;

    constructor(config: FinanciamentoConfig, user: Usuario) {
        this._config = config;
        this._usuario = user;
    }
    
    Inicializar(valor: number): void {
        this._saldo = valor;
        this._totalFGTS = valor;
    }
    
    Atualizar(fdc: FgtsFdc, n): void {
        this._before = fdc;
        this._saldo = fdc._totalFGTS;
        this._correcaoTR = this._saldo*this._usuario.GlobalConfiguration.Referencial;
        this._creditos = (this._usuario.renda*(1 + (Math.floor(n/12)*this._usuario.crescimentoSalarial)))*(0.08);
        this._totalFGTS = this._saldo + this._correcaoTR + this._creditos;
        this._fgtsVaricao = this._totalFGTS - fdc.TotalFgts;
        this._variacaoVP = (this._fgtsVaricao/Math.pow(1+this._usuario.GlobalConfiguration.RentabilidadeLiquidaMensal(),n));
    }

    Resgatar(valor: number,n): void {
        if(valor > this._saldo || !valor) {
            this._totalFGTS -= this._saldo;
            this._resgate = this._saldo;
            if(n) {
                this._fgtsVaricao = this._totalFGTS - this._before.TotalFgts;
                this._variacaoVP = (this._fgtsVaricao/Math.pow(1+this._usuario.GlobalConfiguration.Interna,n));
            }
        } else {
            this._totalFGTS -= valor;
            this._resgate = valor;
            if(n) {
                this._fgtsVaricao = this._totalFGTS - this._before.TotalFgts;
                this._variacaoVP = (this._fgtsVaricao/Math.pow(1+this._usuario.GlobalConfiguration.Interna,n));
            }
        }
    }
    
    get Saldo(): number {
        return this._saldo;
    }
    get CorrecaoTR(): number {
        return this._correcaoTR;
    }
    get Creditos(): number {
        return this._creditos;
    }
    get Resgate(): number {
        return this._resgate;
    }
    get TotalFgts(): number {
        return this._totalFGTS;
    }
    get Variacao(): number {
        return this._fgtsVaricao;
    }
    get VariacaoVP(): number {
        return this._variacaoVP;
    }
}