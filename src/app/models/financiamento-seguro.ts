import { Usuario } from './usuario';
import { ISeguro } from './iseguro';

export class FinanciamentoSeguro {

    usuario: Usuario;
    private _MIP: number;
    private _DFI: number;
    private _ISeguro: ISeguro;

    constructor(seguro: ISeguro, usuario: Usuario) {
        this._ISeguro = seguro;
        this.usuario = usuario;
        this.DFI = this._ISeguro.GetDFI();
        this.MIP = this._ISeguro.GetMIP(new Date(this.usuario.nascimento));
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
