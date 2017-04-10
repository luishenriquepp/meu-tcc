export class ValorPresente {
    public static Calcula(valor: number, n: number) {
        return (valor/Math.pow(1+0.010, n));
    }
}