import { FinanciamentoConfig } from './financiamento-config';
import { Usuario } from './usuario';

export class FinanciamentoFdc {    
    constructor(config: FinanciamentoConfig) {
        this.config = config;
    }
    
    private config: FinanciamentoConfig;
    private usuario: Usuario;

    private ano: number = 0.0759;
    private mes: number = Math.pow((1+this.ano),1/12)-1; 
        
    saldoDevedor1: number = 0;
    saldoDevedor2: number = 0;
    correcaoTR: number = 0;
    amortizacao: number = 0;
    juros: number = 0;
    seguros: number = 0;
    parcela: number = 0;
    parcelaVP: number = 0;
    fgts: number = 0;

    valorImovel: number = 0;
    patrimonio: number = 0;
    varPatrimonio: number = 0;
    vpVariacao: number = 0;

    setProperties(fdc: this) {
        this.parcela = fdc.parcela;
        this.saldoDevedor1 = fdc.saldoDevedor1;
        this.saldoDevedor2 = fdc.saldoDevedor2;
        this.correcaoTR = fdc.correcaoTR;
        this.amortizacao = fdc.amortizacao;
        this.juros = fdc.juros;
        this.seguros = fdc.seguros;
        this.parcelaVP = fdc.parcelaVP;
        this.valorImovel = fdc.valorImovel;
        this.patrimonio = fdc.patrimonio;
        this.varPatrimonio = fdc.varPatrimonio;
        this.vpVariacao = fdc.vpVariacao;
        this.usuario = fdc.usuario;
    }
    
    setUsuario(usuario: Usuario): void {
        this.usuario = usuario;
        this.saldoDevedor1 = this.usuario.valorImovel - this.usuario.disponivel;
        this.saldoDevedor2 = this.usuario.valorImovel - this.usuario.disponivel;
        this.valorImovel = this.usuario.valorImovel;
        this.patrimonio = this.usuario.disponivel;
    }

    Atualizar(n: number, fdc: FinanciamentoFdc): void {
        this.attSaldoDevedor(fdc);
        this.attCorrecaoTR();
        this.attSaldoDevedor2();
        this.attAmortizacao(n);        
        this.attJuros();
        this.attSeguro();
        this.attParcela();
        this.attParcelaValorPresente(n);
        this.attValorImovel();        
        var patri = this.patrimonio;
        this.attPatrimonio();
        this.attVariacaoPatrimonio(patri);
        this.attVariacaoValorPresente(n);
    }

    attSaldoDevedor(fdc: FinanciamentoFdc) {
        this.saldoDevedor1 = fdc.saldoDevedor2 - fdc.amortizacao;
    }

    attCorrecaoTR(): void {
        this.correcaoTR = (this.saldoDevedor1 * this.config.TRMensal);
    }

    attSaldoDevedor2(): void {
        this.saldoDevedor2 = this.saldoDevedor1 + this.correcaoTR;
    }
    
    attAmortizacao(n: number): void {
        this.amortizacao = (this.saldoDevedor2)/(this.usuario.prestacoes-(n-1));
    }

    attJuros(): void {
        this.juros = (this.config.JurosMensais * this.saldoDevedor2)
    }

    attSeguro(): void {
        this.seguros = (this.config.Seguro.DFI * this.usuario.valorImovel) + (this.config.Seguro.MIP * this.saldoDevedor1);
    }
    
    attParcela(): void {
        this.parcela = this.amortizacao + this.juros + this.seguros + this.config.TaxaAdministrativa;
    }
    
    attParcelaValorPresente(n: number): void {
        this.parcelaVP = (this.parcela/Math.pow(1+this.config.Rentabilidade,n));
    }

    attValorImovel(): void {
        this.valorImovel = this.valorImovel*(1+this.mes);
    }

    attPatrimonio(): void {
        this.patrimonio = this.valorImovel - this.saldoDevedor1;
    }

    attVariacaoPatrimonio(patrimonio: number) {
        this.varPatrimonio = this.patrimonio - patrimonio;
    }

    attVariacaoValorPresente(n: number): void {
        this.vpVariacao = (this.varPatrimonio/Math.pow(1+this.config.Rentabilidade,n));
    }
}
