import { Financiamento } from './financiamento';
import { FinanciamentoFdc } from './financiamento-fdc';

export class FinanciamentoSemFgts extends Financiamento {
    FluxoDeCaixa(): void {
        for(var i=0; i<=this.Usuario.prestacoes;i++) {
            if(i == 0) {
                this.Prestacoes.push(this.Fdc);
                continue;
            }
            var nFdc = new FinanciamentoFdc(this.Configuracao);
            nFdc.setProperties(this.Prestacoes[i-1]);
            nFdc.Atualizar(i,this.Prestacoes[i-1]);
            this.Prestacoes.push(nFdc);
            
            this.Resultado.IncrementaParcela(this.Prestacoes[i]);
        }        
    }
}
