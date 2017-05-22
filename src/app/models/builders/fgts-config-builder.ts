import {FinanciamentoFgtsConfig, Posterior} from '../financiamento-fgts-config';

export class FgtsConfigBuilder {
    
    public Build(entrada: boolean, fgts: number, posterior: number): FinanciamentoFgtsConfig {
        return this.create(entrada, fgts, posterior);
    }

    private create(entrada: boolean, fgts: number, posterior: number): FinanciamentoFgtsConfig {
        let fgtsConfig = new FinanciamentoFgtsConfig();
        fgtsConfig.CrescimentoSalarial = 0.067;
        fgtsConfig.Entrada = entrada;
        fgtsConfig.Fgts = fgts;
        fgtsConfig.Posterior = posterior;
        
        return fgtsConfig;
    }
}