import {Usuario} from '../usuario';
import {FinanciamentoConfig, Seguradora} from '../financiamento-config';
import {FinanciamentoFgtsConfig, Posterior} from '../financiamento-fgts-config';
import {FinanciamentoSeguro} from '../financiamento-seguro';
import {IIdentifier} from '../i-identifier';
import {GlobalConfiguration} from '../global-configuration';
import {Dates} from '../../utils/dates';

export class AdvancedProperties implements IIdentifier {
    public Id: number;
    public Identificacao: string;
    public Descricao: string;

    constructor(usuario: Usuario, config: FinanciamentoConfig, fgtsConfig: FinanciamentoFgtsConfig, seguro: FinanciamentoSeguro) {
        this._usuario = usuario;
        this._financiamentoConfig = config;
        this._fgtsConfig = fgtsConfig;
        this._seguro = seguro;
    }
    
    private _usuario: Usuario;
    private _financiamentoConfig: FinanciamentoConfig;
    private _fgtsConfig: FinanciamentoFgtsConfig;
    private _seguro: FinanciamentoSeguro;

    public ValorImovel(): number {
        return this._usuario.valorImovel;
    }

    public Disponivel(): number {
        return this._usuario.disponivel;
    }
    
    public Prestacoes(): number {
        return this._usuario.prestacoes;
    }

    public UsaFgts(): boolean {
        return this._usuario.usaFGTS;
    }

    public Nascimento(): Date {
        return this._usuario.nascimento;
    }
    
    public Renda(): number {
        return this._usuario.renda;
    }

    public Fgts(): number {
        return this._fgtsConfig.Fgts;
    }
    
    public CrescimentoSalarial(): number {
        return this._fgtsConfig.CrescimentoSalarial;
    }

    public get GlobalConfiguration(): GlobalConfiguration {
        return this._usuario.GlobalConfiguration;
    }
    public set GlobalConfiguration(value: GlobalConfiguration) {
        this._usuario.GlobalConfiguration = value;
    }

    public TaxaAdministrativa(): number {
        return this._financiamentoConfig.TaxaAdministrativa;
    }

    public JurosMensais(): number {
        return this._financiamentoConfig.JurosMensais;
    }

    public UsaComoEntrada(): boolean {
        return this._fgtsConfig.Entrada;
    }

    public Posterior(): Posterior {
        return this._fgtsConfig.Posterior;
    }

    public Seguradora(): Seguradora {
        return this._financiamentoConfig.Seguradora;
    }
    
    public DFI(): number {
        return this._seguro.DFI;
    }

    public MIP(): number {
        let age = new Dates(this._usuario.nascimento);
        this._seguro.Calcular(age.GetIdade());

        return this._seguro.MIP;
    }

    public set Seguro(value: FinanciamentoSeguro) {
        this._seguro = value;
    }
}