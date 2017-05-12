import {ExtratoFinanciamento} from '../financiamento/extrato-financiamento';
import {Parcela} from '../financiamento/parcela';
import {AdvancedProperties} from '../financiamento/advanced-properties';

export class ExtratoFinanciamentoBuilder {
    public Build(parcelas: number): Array<ExtratoFinanciamento> {

        let extrato = new Array<ExtratoFinanciamento>();
        extrato.push(new ExtratoFinanciamento());

        for (let i=1;i<=parcelas;i++) {
            let ex = new ExtratoFinanciamento();
            ex.Parcela = new Parcela(null);
            ex.Parcela.Amortizar(10000,i);
            extrato.push(ex);
        }
        return extrato;
    }
}