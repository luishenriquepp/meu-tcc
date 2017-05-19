import { LogicaTemporal } from '../../utils/logica-temporal';

export class Aluguel {
    private _prestacoes: number = 0;
    private _rendimentoMensal: number;
    private _prestacaoAluguel: number;
    public get PrestacaoAluguel(): number {
        return this._prestacaoAluguel;
    }

    constructor(primeiroAluguel:number, rendimento: number = 0.005) {
        this._rendimentoMensal = rendimento;
        this._prestacaoAluguel = primeiroAluguel;
    }

    public Pagar(): void {
        this._prestacoes++;
        if(LogicaTemporal.IniciouAnoNovo(this._prestacoes)) {
            this._prestacaoAluguel += this._prestacaoAluguel * this._rendimentoMensal;
        }
    }
}