import {Posterior} from '../models/financiamento-fgts-config';
import {AdvancedProperties} from '../models/financiamento/advanced-properties';

export class FinanciamentoToString {
    private readonly financiamento: AdvancedProperties;
    
    private _descricao : string;
    public get Descricao() : string {
        return this._descricao;
    }
    public set Descricao(v : string) {
        this._descricao = v;
    }
    
    private _identificacao : string;
    public get Identificacao() : string {
        return this._identificacao;
    }
    public set Identificacao(v : string) {
        this._identificacao = v;
    }
    
    constructor(financiamento: AdvancedProperties) {
        this.financiamento = financiamento;
    }

    public Process(): void {

        this._identificacao = `fin${this.financiamento.ValorImovel()/1000}v${this.financiamento.Disponivel()/1000}d${this.financiamento.Prestacoes()}p`;
                        
        this._descricao = 
`Financiamento de imóvel com valor R$ ${this.toLocale(this.financiamento.ValorImovel())} e entrada R$ ${this.toLocale(this.financiamento.Disponivel())} com previsão de ${this.financiamento.Prestacoes()} prestações.
Usuário com renda mensal R$ ${this.toLocale(this.financiamento.Renda())} e crescimento salarial de ${this.toPercent(this.financiamento.CrescimentoSalarial())} ao ano.
Financiamento com juros de ${this.toPercent(this.financiamento.JurosMensais())} e Taxa administrativa de R$ ${this.financiamento.TaxaAdministrativa()} por mês.
${this.fgts()}`;
    }

    private toPercent(taxa: number): string {
        let n = taxa*100;
        return n.toFixed(2)+"%";
    }

    private fgts(): string {
        if(!this.financiamento.UsaFgts()) {
            return 'Sem fundo de garantia.';
        }
        let msg = `Valor de FGTS inicial R$ ${this.toLocale(this.financiamento.Fgts())}`;
        if(this.financiamento.UsaComoEntrada()) {
            msg += ' abatido do salvo devedor na entrada e posteriormente ';
        } else {
            msg += ' não utilizado na entrada e posteriormente ';
        }
        switch(this.financiamento.Posterior()) {
            case Posterior.NaoUsar: 
                msg += 'não utilizado.';
                break;
            case Posterior.SaldoDevedor:
                msg += 'deduzido do saldo devedor.';
                break;
            case Posterior.Parcelas:
                msg += 'abatido das parcelas.';
                break;
        }

        return msg;
    }

    private toLocale(any: number): string {
        return any.toLocaleString('pt-BR');
    }
}