import {IIdentifier} from './i-identifier';
import {FinancialMath} from '../utils/financial-math';

export class GlobalConfiguration implements IIdentifier {
    public Id: number;
    public Identificacao: string;
    public Descricao: string;
    public Referencial: number;    
    public Interna: number;    
    public Rentabilidade : number;    
    public Imovel: number;    
    public Fundo: number;    
    public Aluguel: number;    
    public ImpostoRenda: number;
    public Juros: number;

    public RentabilidadeLiquida(): number {
        return (this.Rentabilidade*(1-this.ImpostoRenda));
    }

    public RentabilidadeLiquidaMensal(): number {
        return FinancialMath.YearToMonth(this.Rentabilidade);
    }      
}