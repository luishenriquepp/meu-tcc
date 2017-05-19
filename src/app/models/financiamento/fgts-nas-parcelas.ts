import {IProcessFgts} from './i-process-fgts';
import {FgtsDependency} from './fgts-dependency';

export class FgtsNasParcelas implements IProcessFgts {
      
    private _parcelaAcumulada : number = 0;
    public get ParcelaAcumulada() : number {
        return this._parcelaAcumulada;
    }
    public set ParcelaAcumulada(v : number) {
        this._parcelaAcumulada = v;
    }
        
    public Process(dependency: FgtsDependency, mes: number): void {

        this._parcelaAcumulada += dependency.Extrato[mes].Parcela.Parcela();
        if(mes % 12 == 0) { 
            let taxa: number;
            if(dependency.Extrato[mes-11].MontanteFgts >= this._parcelaAcumulada*0.8) {
                taxa = 0.8;
            } else if(dependency.Extrato[mes-11].MontanteFgts >= this._parcelaAcumulada*0.005){
                taxa = dependency.Extrato[mes-11].MontanteFgts/this._parcelaAcumulada;
            } else {
                return;
            }
            
            const valorResgatado = this._parcelaAcumulada * taxa;

            dependency.Extrato[mes-11].Resgate = valorResgatado;
            dependency.Extrato[mes-11].MontanteFgts -= valorResgatado;
            dependency.Extrato[mes-11].Parcela.DescontaParcela(taxa);
            
            dependency.Fundo.Sacar(valorResgatado);
            
            for(let i=10; i>=0; i--) {
                let ex = dependency.Fundo.Depositar(dependency.Extrato[1].DepositoFgts);
                dependency.Extrato[mes-i].RendimentoFgts = ex.Rendimento;
                dependency.Extrato[mes-i].MontanteFgts = dependency.Fundo.ValorAcumulado;
                dependency.Extrato[mes-i].Parcela.DescontaParcela(taxa);
            }
            this._parcelaAcumulada = 0;
        }
    }
}