import { GerenciadorDoExtrato, ExtratoAluguel } from './aluguel';

describe('gerenciador do extrato', () => {    
    it('deve adicionar um extrato de aluguel', () => {
        let extratoAluguel = new ExtratoAluguel();
        let gerenciador = new GerenciadorDoExtrato();

        gerenciador.Adicionar(extratoAluguel);

        expect(gerenciador.ExtratoAluguel.length).toBe(1);
    });

    it('deve adicionar dez extratos de aluguel', () => {
        let extratoAluguel = new ExtratoAluguel();
        let gerenciador = new GerenciadorDoExtrato();

        for(let i=0; i<10; i++) {
            gerenciador.Adicionar(extratoAluguel);
        }    

        expect(gerenciador.ExtratoAluguel.length).toBe(10);
    });

    it('vpl precisa ser maior do que zero', () => {
        let extratoAluguel = new ExtratoAluguel();
        let extratoAluguel2 = new ExtratoAluguel();
        extratoAluguel2.DepositoFundo = 500;
        let gerenciador = new GerenciadorDoExtrato();
        
        gerenciador.Adicionar(extratoAluguel);
        gerenciador.Adicionar(extratoAluguel2);

        expect(gerenciador.ExtratoAluguel[1].ValorPresente).toBeGreaterThan(0);
    });
});