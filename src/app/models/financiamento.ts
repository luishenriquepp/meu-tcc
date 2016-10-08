import { Usuario } from './usuario';
import { FinanciamentoFdc } from './financiamento-fdc';

export class Financiamento {    
    
    usuario: Usuario;
    prestacoes: FinanciamentoFdc[] = new Array();

    primeiraParcela: number = 0;
    ultimaParcela: number = 0;
    parcelaTotal: number = 0;
    parcelaVPTotal: number = 0;
    comprometimento: number = 0;
    patrimonioTotal: number = 0;
    patrimonioVPTotal: number = 0;

    vlPresente: number = 0;
    vlNominal: number = 0;

    constructor(usuario: Usuario) {
        this.usuario = usuario;
    }
    
    vfdc: FinanciamentoFdc = new FinanciamentoFdc();
    
    fdc(): void {
        this.vfdc.setUsuario(this.usuario);
        for(var i=0; i<=this.usuario.prestacoes;i++) {                    
            if(i == 0) {
                var copy = new FinanciamentoFdc();            
                copy.setProperties(this.vfdc);
                this.prestacoes.push(copy);
                continue;
            }
            
            this.vfdc.atualizar(i);
            var copy = new FinanciamentoFdc();            
            copy.setProperties(this.vfdc);
            this.prestacoes.push(copy);
            
            this.parcelaTotal += this.prestacoes[i].parcela;
            this.parcelaVPTotal += this.prestacoes[i].parcelaVP;
            this.patrimonioVPTotal += this.prestacoes[i].vpVariacao;
        }
        alert(this.patrimonioVPTotal);
        this.primeiraParcela = this.prestacoes[1].parcela;
        this.comprometimento = this.primeiraParcela/this.usuario.renda;
        this.ultimaParcela = this.prestacoes[this.prestacoes.length-1].parcela;
                
        this.patrimonioVPTotal += this.usuario.disponivel;
        this.patrimonioTotal = this.prestacoes[this.prestacoes.length-1].valorImovel;
        
        this.vlPresente = this.patrimonioVPTotal-this.usuario.disponivel-this.parcelaVPTotal;
        this.vlNominal = this.patrimonioTotal-this.usuario.disponivel-this.parcelaTotal;
    }
}
