import { ISeguro } from './iseguro';
import { Dates } from '../utils/dates';

export class SeguradoraSa implements ISeguro {
    GetDFI(): number {
        return 0.0000926;
    }
    GetMIP(nascimento: Date): number {                
        var idade = new Dates(nascimento).GetIdade();
        if(idade <= 30) {
            return 0.0000897;            
        } else if(idade <= 40) {
            return 0.0001129;
        } else if(idade <= 50) {
            return 0.0003231;
        } else if(idade <= 60) {
            return 0.0008407;
        } else if(idade <= 70) {
            return 0.0015625;
        } else if(idade <= 75) {
            return 0.0024909;
        } else {
            return 0.0029826;
        }
    }
}
