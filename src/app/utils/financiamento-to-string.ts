import {Financiamento} from '../models/financiamento-old/financiamento';
import {Posterior} from '../models/financiamento-fgts-config';

export class FinanciamentoToString {
    private readonly financiamento: Financiamento;
    
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
    
    constructor(financiamento: Financiamento) {
        this.financiamento = financiamento;
    }

    public Process(): void {
        let user = this.financiamento.Usuario;
        let finConfig = this.financiamento.Configuracao;

        this._identificacao = `fin${user.valorImovel/1000}v${user.disponivel/1000}d${user.prestacoes}p`;
                        
        this._descricao = 
`Financiamento de imóvel com valor R$ ${this.toLocale(user.valorImovel)} e entrada R$ ${this.toLocale(user.disponivel)} com previsão de ${user.prestacoes} prestações.
Usuário com renda mensal R$ ${this.toLocale(user.renda)} e crescimento salarial de ${this.toPercent(user.crescimentoSalarial)} ao ano.
Financiamento com juros de ${this.toPercent(finConfig.JurosAnuais)} e Taxa administrativa de R$ ${finConfig.TaxaAdministrativa} por mês.
${this.fgts()}`;
    }

    private toPercent(taxa: number): string {
        let n = taxa*100;
        return n.toFixed(2)+"%";
    }

    private fgts(): string {
        if(!this.financiamento.Usuario.usaFGTS) {
            return 'Sem fundo de garantia.';
        }
        let msg = `Valor de FGTS inicial R$ ${this.toLocale(this.financiamento.Usuario.FGTS)}`;
        if(this.financiamento.Configuracao.FGTSConfig.Entrada) {
            msg += ' abatido do salvo devedor na entrada e posteriormente ';
        } else {
            msg += ' não utilizado na entrada e posteriormente ';
        }
        switch(this.financiamento.Configuracao.FGTSConfig.Posterior) {
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