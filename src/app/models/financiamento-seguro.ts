import { ISeguro } from './iseguro';

export class FinanciamentoSeguro {

    private _MIP: number;
    private _DFI: number;
    private _ISeguro: ISeguro;

    constructor(seguro: ISeguro) {
        this._ISeguro = seguro;
    }
        
    set DFI(dfi: number) {
        this._DFI = dfi;
    }

    get DFI(): number {
        return this._ISeguro.GetDFI();
    } 

    set MIP(mip: number) {
        this._MIP = mip;
    }

    get MIP(): number {
        return this._ISeguro.GetMIP(new Date(1988, 4));
    } 
}
