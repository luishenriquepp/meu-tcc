import {Injectable} from '@angular/core';

import {GlobalConfiguration} from '../models/global-configuration';

@Injectable()
export class ConfigurationSelectedService {
    private _configuration: GlobalConfiguration;
    public get Configuration() {
        return this._configuration;
    }
    public set Configuration(v: GlobalConfiguration) {
        this._configuration = v;
    }
}