import {ExtratoAluguel} from './extrato-aluguel';
import {ValorPresente} from '../../utils/valor-presente';

export class GerenciadorDoExtrato {
    private _extratoAluguel: ExtratoAluguel[] = [];
    public get ExtratoAluguel(): ExtratoAluguel[] {
        return this._extratoAluguel;
    }

    public Adicionar(extratoAluguel: ExtratoAluguel): void {
        this._extratoAluguel.push(extratoAluguel);        
        this.ValorPresenteLiquido(extratoAluguel);
    }

    private ValorPresenteLiquido(extrato: ExtratoAluguel): void {
        let qtdExtratos = this._extratoAluguel.length;
        if(qtdExtratos > 1) {
            let vp = ValorPresente.Calcula(extrato.SaldoParcial(), qtdExtratos);
            extrato.ValorPresente = vp;
        }        
    }
}