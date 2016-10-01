import { FinanciamentoConfig } from './financiamento-config';
import { Usuario } from './usuario';

export class FinanciamentoFdc {
        
    config: FinanciamentoConfig = new FinanciamentoConfig();
    private usuario: Usuario;

    saldoDevedor1: number = 0;
    saldoDevedor2: number = 0;
    correcaoTR: number = 0;
    amortizacao: number = 0;
    juros: number = 0;
    seguros: number = 0;
    parcela: number = 0;
    parcelaVP: number = 0;

    setProperties(fdc: this) {
        this.parcela = fdc.parcela;
        this.saldoDevedor1 = fdc.saldoDevedor1;
        this.saldoDevedor2 = fdc.saldoDevedor2;
        this.correcaoTR = fdc.correcaoTR;
        this.amortizacao = fdc.amortizacao;
        this.juros = fdc.juros;
        this.seguros = fdc.seguros;
        this.parcelaVP = fdc.parcelaVP;
    }
    
    setUsuario(usuario: Usuario): void {
        this.usuario = usuario;
        this.saldoDevedor1 = this.usuario.valorImovel - this.usuario.disponivel;
        this.saldoDevedor2 = this.usuario.valorImovel - this.usuario.disponivel;
    }

    atualizar(parcela: number): void {
        this.saldoDevedor1 = this.saldoDevedor2 - this.amortizacao;
        this.calculaCorrecaoTR();
        this.saldoDevedor2 = this.saldoDevedor1 + this.correcaoTR;        
        this.amortizar(parcela);
        this.calcularJuros();
        this.calculaSeguro();
        this.calcularParcela();
        this.parcelaVP = (this.parcela/Math.pow(1+this.config.rentabilidade,parcela));
    }

    amortizar(n: number): void {
        this.amortizacao = (this.saldoDevedor2)/(this.usuario.prestacoes-(n-1));
    }

    calcularJuros(): void {
        this.juros = (this.config.juros_mensais * this.saldoDevedor2)
    }

    calcularParcela(): void {
        this.parcela = this.amortizacao + this.juros + this.seguros + this.config.taxaAdm;
    }

    calculaSeguro(): void {
        this.seguros = (this.config.seguro_dfi * this.usuario.valorImovel) + (this.config.seguro_mip * this.saldoDevedor1);
    }

    calculaCorrecaoTR(): void {
        this.correcaoTR = (this.saldoDevedor1 * this.config.tr_mensal);
    }
}
