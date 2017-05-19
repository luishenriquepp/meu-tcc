import {GlobalConfiguration} from './global-configuration';

export class Usuario {        
    valorImovel: number = 200000;
    disponivel: number = 75000;
    prestacoes: number = 420;
    usaFGTS: boolean = true;
    nascimento: Date;
    renda: number = 4500;
    
    private _globalConfiguration : GlobalConfiguration;
    public get GlobalConfiguration() : GlobalConfiguration {
        return this._globalConfiguration;
    }
    public set GlobalConfiguration(v : GlobalConfiguration) {
        this._globalConfiguration = v;
    }    
}
