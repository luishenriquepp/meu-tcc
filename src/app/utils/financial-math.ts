export class FinancialMath {
    
    public static YearToMonth(yearTax: number) {
        return Math.pow((1+yearTax),1/12)-1;
    }

    public static MonthToYear(monthTax: number) {
        return Math.pow((1+monthTax),12)-1;
    }
}