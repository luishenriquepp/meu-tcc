import { ISeguro } from './iseguro';
import { Dates } from '../utils/dates';

export class SeguradoraHdi implements ISeguro{
    GetDFI(): number {
        return 0.0000792;
    }
    GetMIP(nascimento: Date): number {        
        var idade = new Dates(nascimento).GetIdade();
        if(idade <= 30) {
            return 0.0000779;            
        } else if(idade <= 40) {
            return 0.0000981;
        } else if(idade <= 50) {
            return 0.0002691;
        } else if(idade <= 60) {
            return 0.0007366;
        } else if(idade <= 70) {
            return 0.0013059;
        } else if(idade <= 75) {
            return 0.0021656;
        } else {
            return 0.0036050;
        }
    }
}
