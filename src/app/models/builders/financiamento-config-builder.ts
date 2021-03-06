import {FinanciamentoConfig,Seguradora} from '../financiamento-config';

export class FinanciamentoConfigBuilder {
    
    public Build(): FinanciamentoConfig {

        let config = new FinanciamentoConfig();
        config.Seguradora = Seguradora.HDI;
        config.TaxaAdministrativa = 35;

        return config;
    }
}