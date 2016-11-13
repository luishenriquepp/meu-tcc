import { Usuario } from './usuario';
import { FinanciamentoConfig } from'../models/financiamento-config';
import { FinanciamentoFdc } from './financiamento-fdc';
import { FinanciamentoResultado } from './financiamento-resultado';

export abstract class Financiamento {    
    
    private _usuario: Usuario;
    private _prestacoes: FinanciamentoFdc[] = new Array();
    private _config: FinanciamentoConfig;
    private _vfdc: FinanciamentoFdc;
    private _resultado: FinanciamentoResultado;

    constructor(usuario: Usuario, config: FinanciamentoConfig) {
        this._usuario = usuario;
        this._config = config;
        this._vfdc = new FinanciamentoFdc(this._config);
        this._vfdc.setUsuario(this.Usuario);
        this._resultado = new FinanciamentoResultado();
        this._resultado.Usuario = this._usuario;
        this._resultado.Parcela = this._prestacoes;
    }    
    
    FluxoDeCaixa(): void { }
    
    protected get Fdc() {
        return this._vfdc;
    }

    protected set Fdc(fdc: FinanciamentoFdc) {
        this._vfdc = fdc;
    }
    
    protected get Usuario(): Usuario {
        return this._usuario;
    } 

    protected set Usuario(usuario: Usuario) {
        this._usuario = usuario;
    }
    
    public get Prestacoes(): FinanciamentoFdc[] {
        return this._prestacoes;
    } 

    public set Prestacoes(prestacoes: FinanciamentoFdc[]) {
        this._prestacoes = prestacoes;
    }

    public get Configuracao(): FinanciamentoConfig {
        return this._config;
    } 

    public set Configuracao(config: FinanciamentoConfig) {
        this._config = config;
    }

    public get Resultado(): FinanciamentoResultado {
        return this._resultado;
    } 

    public set Resultado(resultado: FinanciamentoResultado) {
        this._resultado = resultado;
    }
}
