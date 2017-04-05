import { Investimento } from './aluguel';

describe('investimento', () => {
    
    it('deve render mensalmente', () => {
        let valor = 10000;
        let investimento = new Investimento(valor);

        investimento.Depositar();

        expect(investimento.ValorAcumulado).toBeGreaterThan(valor);
    });

    it('deve render mensalmente usando a taxa informada', () => {
        let valor = 10000;
        let taxa = 0.01;
        let investimento = new Investimento(valor, taxa);

        investimento.Depositar();
        
        expect(investimento.ValorAcumulado).toBe(valor + valor * taxa);
    });

    it('deve acumular o valor informado ao depositar', () => {
        let investimento = new Investimento();
        let valor = 5000;

        investimento.Depositar(valor);

        expect(investimento.ValorAcumulado).toBe(valor);        
    });

    it('nao deve render o valor de deposito inicial no primeiro mes', () => {
        let valor = 5000;
        let depositoInicial = 20000;
        let taxa = 0.01;

        let investimento = new Investimento(depositoInicial, taxa);

        investimento.Depositar(valor);

        expect(investimento.ValorAcumulado)
        .toBe(valor+depositoInicial+(depositoInicial*taxa));        
    });
});