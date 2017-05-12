import {ExtratoInvestimento} from './extrato-investimento';

export class Investimento {
    private rendimentoMensal: number;    
    
    private _valorAcumulado : number;
    public get ValorAcumulado() : number {
        return this._valorAcumulado;
    }            

    constructor(deposito: number = 0, rendimento: number = 0.005) {
        this.rendimentoMensal = rendimento;
        this._valorAcumulado = deposito;
    }

    public Depositar (valor: number = 0): ExtratoInvestimento {        
        let rendimento = this.render();
        
        if(valor > 0) {
            this._valorAcumulado += valor;
        }

        return new ExtratoInvestimento(valor, rendimento);
    }

    public Sacar(valor: number = 0): void {
        this._valorAcumulado -= valor;
    }

    private render(): number {
        let rendimento = this._valorAcumulado*this.rendimentoMensal;
        this._valorAcumulado += rendimento;
        return rendimento;
    }
}