import {Injectable} from '@angular/core';

import {GlobalConfiguration} from '../models/global-configuration';
import {GlobalRepository} from '../repository/global-repository';

@Injectable()
export class ConfigurationService {
    private repository: GlobalRepository = new GlobalRepository();
    private static configuration: GlobalConfiguration = new GlobalConfiguration();

    public Busca(): GlobalConfiguration {
        return ConfigurationService.configuration;
    }

    public BuscaTodos(): Promise<Array<GlobalConfiguration>> {
        let promise: Promise<Array<GlobalConfiguration>> = new Promise((properties) => {
            setTimeout(() => {
                let prop = this.repository.BuscaTodos();
                properties(prop);
            }, 800);
        });
        return promise;
    }

    public Salva(global: GlobalConfiguration) {
        this.repository.Adiciona(global);
    }
}