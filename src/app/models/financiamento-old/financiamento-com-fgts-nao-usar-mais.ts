import { Financiamento } from './financiamento';
import { FinanciamentoFdc } from './financiamento-fdc';
import { FgtsFdc } from './fgts-fdc';

export class FinanciamentoComFgtsNaoUsarMais extends Financiamento {
    FluxoDeCaixa(): void {
        let fgtsFdc = new FgtsFdc(this.Configuracao,this.Usuario);
        fgtsFdc.Inicializar(this.Usuario.FGTS);
        if(this.Configuracao.FGTSConfig.Entrada) {
            fgtsFdc.Resgatar(0,0);
        } else {
        }
        this.Prestacoes.push(this.Fdc);
        this.ExtratoFgts.push(fgtsFdc);
        let i = 1;
        while(this.Prestacoes[i-1].saldoDevedor1 > this.Prestacoes[i-1].amortizacao) {
            var nFdc = new FinanciamentoFdc(this.Configuracao);
            nFdc.setProperties(this.Prestacoes[i-1]);
            nFdc.Atualizar(i,this.Prestacoes[i-1]);
            this.Prestacoes.push(nFdc);
            this.Resultado.IncrementaParcela(this.Prestacoes[i]);            
            
            let fFdc = new FgtsFdc(this.Configuracao,this.Usuario);
            fFdc.Atualizar(this.ExtratoFgts[i-1],i);
            this.ExtratoFgts.push(fFdc);
            this.Resultado.IncrementaFgts(this.ExtratoFgts[i],i);
            i++;
        }
    }
}
