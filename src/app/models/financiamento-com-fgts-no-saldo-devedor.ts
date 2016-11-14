import { Financiamento } from './financiamento';
import { FinanciamentoFdc } from './financiamento-fdc';

export class FinanciamentoComFgtsNoSaldoDevedor  extends Financiamento {

    FluxoDeCaixa(): void {
        var fgtsAcumulado = this.Usuario.FGTS;
        var temporizador = 0;
        if(this.Configuracao.FGTSConfig.Entrada) {
            temporizador = 2;
            this.Fdc.saldoDevedor1 -= fgtsAcumulado;
            this.Fdc.saldoDevedor2 -= fgtsAcumulado;
            this.Fdc.fgts = fgtsAcumulado;
            this.Fdc.patrimonio += fgtsAcumulado;
            fgtsAcumulado = 0;
        } else {
            temporizador = 1;
        }

        this.Prestacoes.push(this.Fdc);
        
        for(var i=1; i<=this.Usuario.prestacoes;i++) {

            var nFdc = new FinanciamentoFdc(this.Configuracao);
            nFdc.setProperties(this.Prestacoes[i-1]);
            // nFdc.Atualizar(i,this.Prestacoes[i-1]);
            this.Prestacoes.push(nFdc);
            
            this.Resultado.IncrementaParcela(this.Prestacoes[i]);

            if((i-1) % (temporizador*12) == 0 && i>1) {
                this.Prestacoes[i].saldoDevedor1 -= fgtsAcumulado;
                this.Prestacoes[i].saldoDevedor2 -= fgtsAcumulado;
                this.Prestacoes[i].fgts = fgtsAcumulado;
                this.Prestacoes[i].patrimonio += fgtsAcumulado;
                fgtsAcumulado = 0;
                temporizador += 2;
            }
            fgtsAcumulado += fgtsAcumulado*0.008;
            fgtsAcumulado += this.Usuario.renda * 0.08;
        }
    }
}
