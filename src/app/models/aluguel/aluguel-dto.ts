import {AdvancedProperties} from '../financiamento/advanced-properties';
import {GlobalConfiguration} from '../global-configuration';

export class AluguelDto {
    public aluguelInicial: number;
    public property: AdvancedProperties;
    public configuration: GlobalConfiguration;
}