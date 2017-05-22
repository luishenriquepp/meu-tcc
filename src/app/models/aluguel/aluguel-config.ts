import {AdvancedProperties} from '../financiamento/advanced-properties';
import {GlobalConfiguration} from '../global-configuration';

export class AluguelConfig {
    public aluguelInicial: number;
    public compensar: boolean;
    public property: AdvancedProperties;
    public configuration: GlobalConfiguration;
}