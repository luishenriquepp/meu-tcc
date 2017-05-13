import { FinancialMath } from './financial-math';

describe('util financial math ', () => {
    
    it('deve trazer a taxa mensal a partir de uma taxa anual', () => {
        
        let yearTax: number = 0.20;

        let monthTax = FinancialMath.YearToMonth(yearTax);

        expect(monthTax).toBeCloseTo(0.015309);
    });

    it('deve trazer a taxa anual a partir de uma taxa mensal', () => {
        
        let monthTax: number = 0.01;

        let yearTax = FinancialMath.MonthToYear(monthTax);

        expect(yearTax).toBeCloseTo(0.126825);
    });
});