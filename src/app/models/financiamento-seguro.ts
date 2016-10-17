import { Usuario } from './usuario';
import { ISeguro } from './iseguro';

export class FinanciamentoSeguro {

    private _usuario: Usuario;
    private _MIP: number;
    private _DFI: number;
    private _ISeguro: ISeguro;

    constructor(seguro: ISeguro) {
        this._ISeguro = seguro;
    }
        
    Calcular(): void {
        this.DFI = this._ISeguro.GetDFI();
        this.MIP = this._ISeguro.GetMIP(new Date(this._usuario.nascimento));
    }
    
    set Usuario(usuario: Usuario) {
        this._usuario = usuario;
    }

    get Usuario(): Usuario {
        return this._usuario;
    }    
    
    set DFI(dfi: number) {
        this._DFI = dfi;
    }

    get DFI(): number {
        return this._DFI;
    } 

    set MIP(mip: number) {
        this._MIP = mip;
    }

    get MIP(): number {
        return this._MIP;
    } 
}
