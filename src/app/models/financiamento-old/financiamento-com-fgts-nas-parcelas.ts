import { Financiamento } from './financiamento';
import { FinanciamentoFdc } from './financiamento-fdc';
import { FgtsFdc } from './fgts-fdc';

export class FinanciamentoComFgtsNasParcelas extends Financiamento {
        
    private _totalParcelasAnual: number[] = new Array();
        
    FluxoDeCaixa(): void {
        var parcelaAcumulado: number = 0;
        let fgtsFdc = new FgtsFdc(this.Configuracao,this.Usuario);
        fgtsFdc.Inicializar(this.Usuario.FGTS);

        if(this.Configuracao.FGTSConfig.Entrada) {
            fgtsFdc.Resgatar(0,i);
        }
        this.Prestacoes.push(this.Fdc);
        this.ExtratoFgts.push(fgtsFdc);

        for(var i=1; i<=this.Usuario.prestacoes;i++) {
            var nFdc = new FinanciamentoFdc(this.Configuracao);
            nFdc.setProperties(this.Prestacoes[i-1]);
            nFdc.Atualizar(i,this.Prestacoes[i-1]);
            this.Prestacoes.push(nFdc);

            let fFdc = new FgtsFdc(this.Configuracao,this.Usuario);
            fFdc.Atualizar(this.ExtratoFgts[i-1],i);
            this.ExtratoFgts.push(fFdc);
            
            parcelaAcumulado += this.Prestacoes[i].parcela;

            if(i % 12 == 0) {                
                this._totalParcelasAnual.unshift(parcelaAcumulado);
                parcelaAcumulado = 0;
            }
            
            this.Resultado.IncrementaParcela(this.Prestacoes[i]);
        }
        
        var usando = false;
        var taxa = 0;

        for(var i=1; i<=this.Usuario.prestacoes;i++) {            
            if((i-1) % 12 == 0) {
                var usando = false;
                var valor = this._totalParcelasAnual.pop();

                if(this.ExtratoFgts[i].Saldo >= valor*0.8) {
                    usando = true;
                    this.ExtratoFgts[i].Resgatar(valor,i);
                    taxa = 0.8;
                } else if(this.ExtratoFgts[i].Saldo >= valor*0.005) {
                    taxa = this.ExtratoFgts[i].Saldo/valor;
                    this.ExtratoFgts[i].Resgatar(valor,i);
                    usando = true;
                }
            }

            if(usando) {
                this.Prestacoes[i].parcela *= (1-taxa);
                this.Prestacoes[i].attParcelaValorPresente(i);
                this.Prestacoes[i].attVariacaoValorPresente(i);
            }
            if(i < this.ExtratoFgts.length-1) {
                this.ExtratoFgts[i+1].Atualizar(this.ExtratoFgts[i],i);
            }
        }        
    }
}