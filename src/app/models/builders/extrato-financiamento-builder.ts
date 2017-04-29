import {ExtratoFinanciamento,Parcela} from '../financiamento/financiamento';
import {Usuario} from '../usuario';
import {FinanciamentoConfigBuilder} from '../builders/financiamento-config-builder';

export class ExtratoFinanciamentoBuilder {
    public Build(parcelas: number): Array<ExtratoFinanciamento> {
        let user = new Usuario();
        let builder = new FinanciamentoConfigBuilder();
        let config = builder.Build(user);

        let extrato = new Array<ExtratoFinanciamento>();
        extrato.push(new ExtratoFinanciamento());

        for (let i=1;i<=parcelas;i++) {
            let ex = new ExtratoFinanciamento();
            ex.Parcela = new Parcela(config, user);
            ex.Parcela.Amortizacao(10000,i);
            extrato.push(ex);
        }
        return extrato;
    }
}