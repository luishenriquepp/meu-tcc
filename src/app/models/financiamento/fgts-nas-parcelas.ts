import {ExtratoFinanciamento} from './financiamento';
import {Investimento} from '../aluguel/aluguel';

export class FgtsNasParcelas {
        
    private _parcelaAcumulada : number = 0;
    public get ParcelaAcumulada() : number {
        return this._parcelaAcumulada;
    }
    public set ParcelaAcumulada(v : number) {
        this._parcelaAcumulada = v;
    }
        
    public ProcessarFgts(extrato: Array<ExtratoFinanciamento>, mes: number): void {
        this._parcelaAcumulada += extrato[mes].Parcela.Parcela();
        if(mes % 12 == 0) { 
            let taxa: number;
            if(extrato[mes-11].MontanteFgts >= this._parcelaAcumulada*0.8) {
                taxa = 0.8;
            } else if(extrato[mes-11].MontanteFgts >= this._parcelaAcumulada*0.005){
                taxa = extrato[mes-11].MontanteFgts/this._parcelaAcumulada;
            } else {
                return;
            }
            
            extrato[mes-11].Resgate = this._parcelaAcumulada * taxa;
            extrato[mes-11].MontanteFgts -= this._parcelaAcumulada * taxa;
            extrato[mes-11].Parcela.DescontaParcela(taxa);
            
            let fundo = new Investimento(extrato[mes-11].MontanteFgts, 0.003);
            
            for(let i=10; i>=0; i--) {
                let ex = fundo.Depositar(extrato[mes-i].DepositoFgts);
                extrato[mes-i].RendimentoFgts = ex.Rendimento;
                extrato[mes-i].MontanteFgts = fundo.ValorAcumulado;
                extrato[mes-i].Parcela.DescontaParcela(taxa); 
            }
            this._parcelaAcumulada = 0;
        }
    }
}