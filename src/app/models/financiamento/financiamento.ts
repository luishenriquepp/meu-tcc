import {Investimento,Aluguel} from '../aluguel/aluguel';
import {Usuario} from '../usuario';
import {GlobalConfiguration} from '../global-configuration';
import {FinanciamentoConfig} from '../financiamento-config';

export class ProcessadorFinanciamento {
    private financiamento: Financiamento;
    private imovel: Investimento;
    private fundoGarantia: Investimento;
    private salario: Aluguel;
    private readonly user: Usuario;
    private readonly config: FinanciamentoConfig;
    public Extrato: Array<ExtratoFinanciamento> = new Array<ExtratoFinanciamento>();

    constructor(user: Usuario, config: FinanciamentoConfig) {
        this.user = user;
        this.config = config;
    }

    public Processar(): void {
        this.financiamento = new Financiamento(4000, 0.02);
        this.imovel = new Investimento(20000, 0.005);
        this.fundoGarantia = new Investimento(5000, 0.003);
        this.salario = new Aluguel(4000, 0.005);

        this.initialize();

        for(let i=0; i<this.user.prestacoes;i++) {
            this.imovel.Depositar();            
            let sc = this.financiamento.SaldoCorrigido();
            let p = new Parcela(this.config,this.user); //TODO
            let amortizacao = p.Amortizacao(sc, this.user.prestacoes-i);
            this.financiamento.Pagar(amortizacao);
            this.salario.Pagar();

            let ex = new ExtratoFinanciamento();
            ex.SaldoAtual = sc - amortizacao;
            ex.Parcela = p;
            ex.ValorImovel = this.imovel.ValorAcumulado;

            if(this.fundoGarantia != null) {
                let extFgts = this.fundoGarantia.Depositar(400);
                ex.RendimentoFgts = extFgts.Rendimento;
                ex.DepositoFgts = extFgts.Deposito;
                ex.MontanteFgts = this.fundoGarantia.ValorAcumulado;
            }
        }
    }

    private initialize(): void {
        let ex = new ExtratoFinanciamento();
        ex.ValorImovel = this.user.valorImovel;
        ex.SaldoAtual = this.user.valorImovel - this.user.disponivel - this.user.FGTS;
        this.Extrato.push(ex);
    }
}

export class Financiamento {
    private readonly _taxaReferencial: number;        
    private _saldoDevedor : number;
    private _correcaoTaxaReferencial : number;
    
    constructor(saldoDevedorInicial: number, taxaReferencial: number) {
        this._saldoDevedor = saldoDevedorInicial;
        this._taxaReferencial = taxaReferencial;
    }
    
    public SaldoCorrigido(): number {
        this._correcaoTaxaReferencial = this._saldoDevedor * this._taxaReferencial;
        return this._saldoDevedor + this._correcaoTaxaReferencial;
    }

    public Pagar(amortizacao: number) {
        this._saldoDevedor -= amortizacao;
    }
}

export class Parcela {
    private _amortizacao: number = 0;       ;
    private _desconto: number = 0;
    private readonly config: FinanciamentoConfig;
    private readonly user: Usuario;

    constructor(config: FinanciamentoConfig, user: Usuario) {
        this.config = config;
        this.user = user;
    }
        
    private _juros : number = 0;
    public get Juros() : number {
        return this._juros;
    }
    public set Juros(v : number) {
        this._juros = v;
    }
    
    private _seguros : number = 0;
    public get Seguros() : number {
        return this._seguros;
    }
    public set Seguros(v : number) {
        this._seguros = v;
    }  
    
    public TaxaAdministrativa(): number{
        return 10;
    }

    public Amortizacao(saldoCorrigido: number, mesesRestantes: number): number {
        this._amortizacao = (saldoCorrigido)/(mesesRestantes);
        this.calculaSeguro(saldoCorrigido);
        this.calculaJuros(saldoCorrigido);
        return this._amortizacao;
    }

    public Parcela(): number {
        return this._amortizacao + this._seguros + this._juros;
    }

    public ParcelaDescontada(): number {
        return this.Parcela() - this._desconto;
    }

    private calculaJuros(saldo: number): void {
        this._juros = (this.config.JurosMensais * saldo);
    }

    private calculaSeguro(saldo: number): void {
        // this._seguros = (this.config.Seguro.DFI * this.user.valorImovel) + (this.config.Seguro.MIP * saldo);
        this._seguros = 20;
    }

    public DescontaParcela(taxa: number): void {
        this._desconto = this.Parcela() * taxa;
    }
}

export  class ExtratoFinanciamento {    
    private _saldoAtual: number = 0;
    public get SaldoAtual(): number {
        return this._saldoAtual;
    }
    public set SaldoAtual(v: number) {
        this._saldoAtual = v;
    }
    
    private _correcaoTaxaReferencial: number = 0;
    public get CorrecaoTaxaReferencial(): number {
        return this._correcaoTaxaReferencial;
    }
    public set CorrecaoTaxaReferencial(v: number) {
        this._correcaoTaxaReferencial = v;
    }
    
    private _parcela: Parcela;
    public get Parcela(): Parcela {
        return this._parcela;
    }
    public set Parcela(v: Parcela) {
        this._parcela = v;
    }
    
    private _valorImovel: number = 0;
    public get ValorImovel() : number {
        return this._valorImovel;
    }
    public set ValorImovel(v : number) {
        this._valorImovel = v;
    }

    public Patrimonio(): number {
        return this._valorImovel - this._saldoAtual;
    }
    
    private _depositoFgts: number = 0;
    public get DepositoFgts(): number {
        return this._depositoFgts;
    }
    public set DepositoFgts(v: number) {
        this._depositoFgts = v;
    }
    
    private _rendimentoFgts: number = 0;
    public get RendimentoFgts() : number {
        return this._rendimentoFgts;
    }
    public set RendimentoFgts(v : number) {
        this._rendimentoFgts = v;
    }
    
    private _resgate: number = 0;
    public get Resgate() : number {
        return this._resgate;
    }
    public set Resgate(v : number) {
        this._resgate = v;
    }
    
    private _montanteFgts: number = 0;
    public get MontanteFgts() : number {
        return this._montanteFgts;
    }
    public set MontanteFgts(v: number) {
        this._montanteFgts = v;
    }
        
    public get PatrimonioTotal(): number {
        return this.Patrimonio() + this._montanteFgts;
    }
}