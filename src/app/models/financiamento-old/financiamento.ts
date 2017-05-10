import { Usuario } from '../usuario';
import { FinanciamentoConfig } from'../financiamento-config';
import { FinanciamentoFdc } from './financiamento-fdc';
import { FinanciamentoResultado } from './financiamento-resultado';
import { FgtsFdc } from './fgts-fdc';
import { IIdentifier } from '../i-identifier';

export abstract class Financiamento implements IIdentifier {
    Id: number;
    Identificacao: string;
    Descricao: string;

    private _prestacoes: FinanciamentoFdc[] = new Array();
    private _extratoFgts: FgtsFdc[] = new Array();
    private _usuario: Usuario;
    private _config: FinanciamentoConfig;
    private _vfdc: FinanciamentoFdc;    
    private _resultado: FinanciamentoResultado  = new FinanciamentoResultado(this);

    constructor(usuario: Usuario, config: FinanciamentoConfig) {
        this._usuario = usuario;
        this._config = config;
        this._vfdc = new FinanciamentoFdc(this._config);
        this._vfdc.setUsuario(this.Usuario);
    }    
    
    FluxoDeCaixa(): void { }
    
    protected get Fdc() {
        return this._vfdc;
    }

    protected set Fdc(fdc: FinanciamentoFdc) {
        this._vfdc = fdc;
    }
    
    public get Usuario(): Usuario {
        return this._usuario;
    } 

    public set Usuario(usuario: Usuario) {
        this._usuario = usuario;
    }
    
    public get Prestacoes(): FinanciamentoFdc[] {
        return this._prestacoes;
    } 

    public set Prestacoes(prestacoes: FinanciamentoFdc[]) {
        this._prestacoes = prestacoes;
    }

    public get ExtratoFgts(): FgtsFdc[] {
        return this._extratoFgts;
    } 

    public set ExtratoFgts(value: FgtsFdc[]) {
        this._extratoFgts = value;
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