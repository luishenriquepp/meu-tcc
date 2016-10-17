import { Usuario } from './usuario';
import { FinanciamentoConfig } from'../models/financiamento-config';
import { FinanciamentoFdc } from './financiamento-fdc';

export class Financiamento {    
    
    usuario: Usuario;
    prestacoes: FinanciamentoFdc[] = new Array();
    config: FinanciamentoConfig;

    primeiraParcela: number = 0;
    ultimaParcela: number = 0;
    parcelaTotal: number = 0;
    parcelaVPTotal: number = 0;
    comprometimento: number = 0;
    patrimonioTotal: number = 0;
    patrimonioVPTotal: number = 0;
    vfdc: FinanciamentoFdc;

    vlPresente: number = 0;
    vlNominal: number = 0;

    constructor(usuario: Usuario, config: FinanciamentoConfig) {
        this.usuario = usuario;
        this.config = config;
        this.vfdc = new FinanciamentoFdc(this.config);
    }
    
    FluxoDeCaixa(): void {
        this.vfdc.setUsuario(this.usuario);
        // inicia o loop das prestacoes
        for(var i=0; i<=this.usuario.prestacoes;i++) {
            if(i == 0) {
                var copy = new FinanciamentoFdc(this.config);
                copy.setProperties(this.vfdc);
                this.prestacoes.push(copy);
                continue;
            }
            
            this.vfdc.atualizar(i,this.prestacoes[i-1]);
            var copy = new FinanciamentoFdc(this.config);
            copy.setProperties(this.vfdc);
            this.prestacoes.push(copy);
            
            this.parcelaTotal += this.prestacoes[i].parcela;
            this.parcelaVPTotal += this.prestacoes[i].parcelaVP;
            this.patrimonioVPTotal += this.prestacoes[i].vpVariacao;
        }
        // termina o loop das prestacoes
        // seta os valores do resultado
        this.primeiraParcela = this.prestacoes[1].parcela;
        this.comprometimento = this.primeiraParcela/this.usuario.renda;
        this.ultimaParcela = this.prestacoes[this.prestacoes.length-1].parcela;                
        this.patrimonioVPTotal += this.usuario.disponivel;
        this.patrimonioTotal = this.prestacoes[this.prestacoes.length-1].valorImovel;        
        this.vlPresente = this.patrimonioVPTotal-this.usuario.disponivel-this.parcelaVPTotal;
        this.vlNominal = this.patrimonioTotal-this.usuario.disponivel-this.parcelaTotal;
    }

    FluxoDeFGTS(): void {
        if(this.usuario.usaFGTS) {
            for(var i=0; i<=this.usuario.prestacoes;i++) {
                if(this.config.FGTSConfig.Entrada) {
                    if(i == 0) {
                        this.prestacoes[i].saldoDevedor1 -= this.usuario.FGTS;
                        this.prestacoes[i].saldoDevedor2 -= this.usuario.FGTS;
                        this.prestacoes[i].fgts = this.usuario.FGTS;
                        this.prestacoes[i].patrimonio += this.usuario.FGTS;
                        this.usuario.FGTS = 0;
                        continue;
                    }
                    this.prestacoes[i].atualizar(i,this.prestacoes[i-1]);
                }
            }
        }
    }
}
