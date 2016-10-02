import { Usuario } from './usuario';
import { FinanciamentoFdc } from './financiamento-fdc';

export class Financiamento {    
    
    usuario: Usuario;
    prestacoes: FinanciamentoFdc[] = new Array();

    primeiraParcela: number = 0;
    ultimaParcela: number = 0;
    parcelaTotal: number = 0;
    parcelaVPTotal: number = 0;

    constructor(usuario: Usuario) {
        this.usuario = usuario;
    }
    
    vfdc: FinanciamentoFdc = new FinanciamentoFdc();
    
    fdc(): void {
        this.vfdc.setUsuario(this.usuario);
        for(var i=0; i<this.usuario.prestacoes;i++) {                    
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
        }
        this.primeiraParcela = this.prestacoes[1].parcela;
        this.ultimaParcela = this.prestacoes[this.prestacoes.length-1].parcela;
    }
}
