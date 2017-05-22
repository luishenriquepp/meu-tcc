import { Injectable } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Injectable()
export class MaskService {

    public percentMask = createNumberMask({
        prefix: '',
        suffix: '%',
        thousandsSeparatorSymbol: '',
        integerLimit: 7,
        decimalLimit: 6,
        allowLeadingZeroes: true,
        allowDecimal: true,
        decimalSymbol: ','
    });

    public numberMask = createNumberMask({
        prefix: '',
        thousandsSeparatorSymbol: '.',
        integerLimit: 7
    });

    public ConvertToFloat(percentText: string): number {
        percentText = percentText.slice(0,percentText.length-1);
        percentText = percentText.split('.').join('');
        percentText = percentText.split(',').join('.');
        return parseFloat(percentText)/100;
    }

    public ConvertToNumber(numberText: string): number {
        numberText = numberText.split('.').join('');
        return parseInt(numberText);
    }
}