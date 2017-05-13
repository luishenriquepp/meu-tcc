import {ExtratoFinanciamento} from '../financiamento/extrato-financiamento';
import {Parcela} from '../financiamento/parcela';
import {AdvancedProperties} from '../financiamento/advanced-properties';
import {FinanciamentoConfig} from '../financiamento-config';

export class ExtratoFinanciamentoBuilder {
    public Build(parcelas: number): Array<ExtratoFinanciamento> {

        let extrato = new Array<ExtratoFinanciamento>();
        extrato.push(new ExtratoFinanciamento());
        
        let config = new FinanciamentoConfig();
        config.TaxaAdministrativa = 20;
        config.JurosAnuais = 0.10;

        let property = new AdvancedProperties(null,config,null,null);;

        for (let i=1;i<=parcelas;i++) {
            let ex = new ExtratoFinanciamento();
            ex.Parcela = new Parcela(property);
            ex.Parcela.Amortizar(10000,i);
            extrato.push(ex);
        }
        return extrato;
    }
}