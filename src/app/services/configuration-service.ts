import {Injectable} from '@angular/core';

import {GlobalConfiguration} from '../models/global-configuration';

@Injectable()
export class ConfigurationService {
    private static configuration: GlobalConfiguration = new GlobalConfiguration();

    public Busca(): GlobalConfiguration {
        return ConfigurationService.configuration;
    }

    public Salva(global: GlobalConfiguration) {
        ConfigurationService.configuration = global;
    }
}