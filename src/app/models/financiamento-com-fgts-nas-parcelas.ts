import { Financiamento } from './financiamento';
import { FinanciamentoFdc } from './financiamento-fdc';

export class FinanciamentoComFgtsNasParcelas extends Financiamento {
        
    private _totalParcelasAnual: number[] = new Array();
        
    FluxoDeCaixa(): void {
        var parcelaAcumulado: number = 0;
        var fgtsAcumulado = this.Usuario.FGTS;

        if(this.Configuracao.FGTSConfig.Entrada) {
            this.Fdc.saldoDevedor1 -= fgtsAcumulado;
            // this.Fdc.Atualizar()
            this.Fdc.fgts = fgtsAcumulado;
            this.Fdc.patrimonio += fgtsAcumulado;
            fgtsAcumulado = 0;
        }
        this.Prestacoes.push(this.Fdc);

        for(var i=1; i<=this.Usuario.prestacoes;i++) {
            var nFdc = new FinanciamentoFdc(this.Configuracao);
            nFdc.setProperties(this.Prestacoes[i-1]);
            nFdc.Atualizar(i,this.Prestacoes[i-1]);
            this.Prestacoes.push(nFdc);
            
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

                if(fgtsAcumulado >= valor*0.8) {
                    usando = true;
                    fgtsAcumulado -= valor;
                    taxa = 0.8;
                } else if(fgtsAcumulado >= valor*0.005) {
                    taxa = fgtsAcumulado/valor;
                    fgtsAcumulado = 0;
                    usando = true;
                }
            }

            if(usando) {
                this.Prestacoes[i].fgts = this.Prestacoes[i].parcela*taxa;
                this.Prestacoes[i].parcela *= (1-taxa);
                this.Prestacoes[i].attParcelaValorPresente(i);
                this.Prestacoes[i].attVariacaoValorPresente(i);
            }
            fgtsAcumulado += fgtsAcumulado*0.008;
            fgtsAcumulado += this.Usuario.renda * 0.08;
        }        
    }
}
