import { ExtratoAluguel } from './aluguel';

describe('extrato aluguel', () => {

    it('deve calcular o saldo parcial somente com deposito fundo', () => {
        let extratoAluguel = new ExtratoAluguel();
        
        extratoAluguel.DepositoFundo = 1000;

        expect(extratoAluguel.SaldoParcial()).toBe(1000);
    });

    it('deve calcular o saldo parcial somente com as quatro variaveis', () => {
        let extratoAluguel = new ExtratoAluguel();
        
        extratoAluguel.DepositoFundo = 1000;
        extratoAluguel.RendimentoFundo = 400;
        extratoAluguel.DepositoFGTS = 500;
        extratoAluguel.RendimentoFGTS = 100;

        extratoAluguel.Aluguel = 1200;

        expect(extratoAluguel.SaldoParcial()).toBe(800);
    });
});