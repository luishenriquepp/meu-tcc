import {Usuario} from '../usuario';
import {FinanciamentoConfig} from '../financiamento-config';

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