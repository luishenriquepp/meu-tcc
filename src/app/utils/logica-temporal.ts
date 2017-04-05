export class LogicaTemporal {
    public static IniciouAnoNovo(index: number): boolean {
        if(index > 1) {
            let magicNumber = index - 1;
            return magicNumber % 12 == 0;
        }
    }
}