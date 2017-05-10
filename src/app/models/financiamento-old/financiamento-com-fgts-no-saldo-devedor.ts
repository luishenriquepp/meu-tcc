import { Financiamento } from './financiamento';
import { FinanciamentoFdc } from './financiamento-fdc';
import { FgtsFdc } from './fgts-fdc';

export class FinanciamentoComFgtsNoSaldoDevedor  extends Financiamento {

    FluxoDeCaixa(): void {
        var temporizador = 0;
        let fgtsFdc = new FgtsFdc(this.Configuracao,this.Usuario);
        fgtsFdc.Inicializar(this.Usuario.FGTS);
        if(this.Configuracao.FGTSConfig.Entrada) {
            temporizador = 2;
            fgtsFdc.Resgatar(0,0);
        } else {
            temporizador = 1;
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

            if((i-1) % (temporizador*12) == 0 && i>1) {                                
                let valor = this.Prestacoes[i].saldoDevedor2-this.Prestacoes[i].amortizacao;
                if(this.ExtratoFgts[i].Saldo > this.Prestacoes[i].saldoDevedor2) {                    
                    this.ExtratoFgts[i].Resgatar(valor,i);
                    this.Prestacoes[i].fgts = valor;
                    return;
                } else {
                    this.Prestacoes[i].fgts = this.ExtratoFgts[i].Saldo;
                    this.ExtratoFgts[i].Resgatar(0,i);
                }
                this.Prestacoes[i].isNow = true;
                this.Prestacoes[i].Atualizar(i,this.Prestacoes[i-1]);
                temporizador += 2;
            }
            i++;
        }
    }
}