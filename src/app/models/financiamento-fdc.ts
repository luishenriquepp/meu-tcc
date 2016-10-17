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
    
    n: number;
    
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

    atualizar(parcela: number, fdc: FinanciamentoFdc): void {
        if(parcela == 1) {
            // alert(this.saldoDevedor1 +' '+this.saldoDevedor2 +' '+this.amortizacao);
            // alert(this.amortizacao);
        }
        this.calcularSaldoDevedor(fdc);
        this.calculaCorrecaoTR();
        this.saldoDevedor2 = this.saldoDevedor1 + this.correcaoTR;
        this.amortizar(parcela);        
        this.calcularJuros();
        this.calculaSeguro();
        this.calcularParcela();
        this.parcelaVP = (this.parcela/Math.pow(1+this.config.Rentabilidade,parcela));

        // TODO
        this.valorImovel = this.valorImovel*(1+this.mes);
        var patri = this.patrimonio;
        this.patrimonio = this.valorImovel - this.saldoDevedor1;
        this.varPatrimonio = this.patrimonio - patri;
        this.vpVariacao = (this.varPatrimonio/Math.pow(1+this.config.Rentabilidade,parcela));
    }

    calcularSaldoDevedor(fdc: FinanciamentoFdc) {
        this.saldoDevedor1 = fdc.saldoDevedor2 - fdc.amortizacao;
    }
    
    amortizar(n: number): void {
        this.amortizacao = (this.saldoDevedor2)/(this.usuario.prestacoes-(n-1));
    }

    calcularJuros(): void {
        this.juros = (this.config.JurosMensais * this.saldoDevedor2)
    }

    calcularParcela(): void {
        this.parcela = this.amortizacao + this.juros + this.seguros + this.config.TaxaAdministrativa;
    }

    calculaSeguro(): void {
        this.seguros = (this.config.Seguro.DFI * this.usuario.valorImovel) + (this.config.Seguro.MIP * this.saldoDevedor1);
    }

    calculaCorrecaoTR(): void {
        this.correcaoTR = (this.saldoDevedor1 * this.config.TRMensal);
    }
}
