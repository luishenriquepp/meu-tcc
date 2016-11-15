import { Financiamento } from '../models/financiamento';
import { FinanciamentoComFgtsNasParcelas } from '../models/financiamento-com-fgts-nas-parcelas';
import { FinanciamentoComFgtsNoSaldoDevedor } from '../models/financiamento-com-fgts-no-saldo-devedor';
import { FinanciamentoSemFgts } from '../models/financiamento-sem-fgts';
import { Usuario } from '../models/usuario';
import { FinanciamentoConfig } from '../models/financiamento-config';

export class FinanciamentoFactory {    
    private _financiamentoConfig: FinanciamentoConfig;
    private _usuario: Usuario;

    constructor (usuario: Usuario, config: FinanciamentoConfig) {
        this._usuario = usuario;
        this._financiamentoConfig = config;
    }

    Create(): Financiamento {
        if(!this._usuario.usaFGTS) {
            return new FinanciamentoSemFgts(this._usuario, this._financiamentoConfig);
        } else if (this._financiamentoConfig.FGTSConfig.Posterior == 2) {
            return new FinanciamentoComFgtsNasParcelas(this._usuario, this._financiamentoConfig);
        } else if (this._financiamentoConfig.FGTSConfig.Posterior == 1) {
            return new FinanciamentoComFgtsNoSaldoDevedor(this._usuario, this._financiamentoConfig);
        } else {
            return new FinanciamentoSemFgts(this._usuario, this._financiamentoConfig);
        }
    }
}
