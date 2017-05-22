import {AdvancedProperties} from './advanced-properties';

export class Parcela {
    private _desconto: number = 0;
    private readonly jurosMensais: number;
    private readonly taxaAdministrativa: number;

    constructor(juros: number, taxaAdministrativa: number) {
        this.jurosMensais = juros;
        this.taxaAdministrativa = taxaAdministrativa;
    }

    private _amortizacao: number = 0;
    public get Amortizacao(): number {
        return this._amortizacao;
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
        return this.taxaAdministrativa;
    }

    public Amortizar(saldoCorrigido: number, mesesRestantes: number): number {
        
        this._amortizacao = (saldoCorrigido)/(mesesRestantes);
        this.calculaSeguro(saldoCorrigido);
        this.calculaJuros(saldoCorrigido);
        return this._amortizacao;
    }

    public Parcela(): number {
        return this._amortizacao + this._seguros + this._juros + this.taxaAdministrativa;
    }

    public ParcelaDescontada(): number {
        return this.Parcela() - this._desconto;
    }

    private calculaJuros(saldo: number): void {
        this._juros = (this.jurosMensais * saldo);
    }

    private calculaSeguro(saldo: number): void {
        // this._seguros = (this.config.Seguro.DFI * this.user.valorImovel) + (this.config.Seguro.MIP * saldo);
        this._seguros = 20;
    }

    public DescontaParcela(taxa: number): void {
        this._desconto = this.Parcela() * taxa;
    }
}