import { Aluguel } from './aluguel';

describe('aluguel', () => {

    it('garante que o valor da parcela do aluguel eh atualizado apos 12 meses', () => {
        let aluguel = new Aluguel();
        aluguel.aluguelInicial = 1000;
        
        let meses = 13;
        for(let i=1;i<=meses;i++) {
            aluguel.Pagar();
        }

        expect(aluguel.parcela[12].Valor).toBeGreaterThan(1000);
    });

    it('garante que o rendimento anual do aluguel eh acrescido pela taxa informada', () => {
        let aluguel = new Aluguel(0.01);
        aluguel.aluguelInicial = 1000;
        
        let meses = 13;
        for(let i=1;i<=meses;i++) {
            aluguel.Pagar();
        }

        expect(aluguel.parcela[12].Valor).toBe(1000 + 1000*0.01);
    });

    it('garante que esta gerando extratos', () => {
        let aluguel = new Aluguel();
        let meses = 2;
        
        for(let i=1;i<=meses;i++) {
            aluguel.Pagar();
        }

        expect(aluguel.parcela.length).toBe(2);
    });
});