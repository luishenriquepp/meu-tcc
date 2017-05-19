import { FinanciamentoSeguro } from './financiamento-seguro';

export interface ISeguro {
    GetDFI(): number;
    GetMIP(idade: number): number
}
