import {FinanciamentoFgtsConfig} from '../financiamento-fgts-config';
import {IProcessFgts} from './i-process-fgts';
import {FgtsDependency} from './fgts-dependency';

export class FgtsNoSaldoDevedor implements IProcessFgts {

    private anualidade: number;
    public get Anualidade(): number {
        return this.anualidade;
    }
    
    constructor(fgtsConfig: FinanciamentoFgtsConfig) {
        if(fgtsConfig.Entrada) {
            this.anualidade = 2;
        } else {
            this.anualidade = 1;
        }
    }
    
    public Process(dependency: FgtsDependency, mes: number): void {
                             
        if(mes > 1 && (mes-1) % (this.anualidade * 12) == 0) {
            let valorResgatado = dependency.Extrato[mes].MontanteFgts;
            
            if(dependency.Extrato[mes].MontanteFgts > dependency.Extrato[mes].SaldoAtual) {
                valorResgatado = dependency.Extrato[mes].SaldoAtual;
            }
            dependency.Fundo.Sacar(valorResgatado);
            dependency.Financiamento.Abater(valorResgatado);
            
            dependency.Extrato[mes].Resgate = valorResgatado;
            dependency.Extrato[mes].SaldoAtual -= valorResgatado;
            dependency.Extrato[mes].MontanteFgts -= valorResgatado;
            this.anualidade += 2;
        }
    }
}