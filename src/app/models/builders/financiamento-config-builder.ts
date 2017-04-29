import {Usuario} from '../usuario';
import {FinanciamentoConfig} from '../financiamento-config';
import {FinanciamentoFgtsConfig} from '../financiamento-fgts-config';
import {FinanciamentoSeguro} from '../financiamento-seguro';
import {SeguradoraHdi} from '../seguradora-hdi';

export class FinanciamentoConfigBuilder {

        public Build(user: Usuario): FinanciamentoConfig {
            let fgtsConfig = new FinanciamentoFgtsConfig();
            let financiamentoConfig = new FinanciamentoConfig(fgtsConfig);
            let seguro = new SeguradoraHdi();
            financiamentoConfig.Seguro = new FinanciamentoSeguro(seguro);
            financiamentoConfig.Seguro.Usuario = user;
            financiamentoConfig.Seguro.Calcular();
            return financiamentoConfig;
        }
}