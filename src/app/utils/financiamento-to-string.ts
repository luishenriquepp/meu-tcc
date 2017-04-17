import {Financiamento} from '../models/financiamento';

export class FinanciamentoToString {
    private readonly financiamento: Financiamento;
    
    constructor(financiamento: Financiamento) {
        this.financiamento = financiamento;
    }

    public toString(): string {
        let user = this.financiamento.Usuario;
        let finConfig = this.financiamento.Configuracao;
        let msg: string = '';
        msg += 
`Financiamento de imóvel com valor R$ ${user.valorImovel.toLocaleString('pt-BR')} e entrada R$ ${user.disponivel.toLocaleString('pt-BR')} com previsão de ${user.prestacoes} prestações.
Usuário com renda mensal R$ ${user.renda.toLocaleString('pt-BR')} e crescimento salarial anual de ${user.crescimentoSalarial}.
Financiamento com juros anuais de  ${finConfig.JurosAnuais}, TR mensal de ${finConfig.TRMensal}, Taxa administrativa de ${finConfig.TaxaAdministrativa}`;
        return msg;
    }
}