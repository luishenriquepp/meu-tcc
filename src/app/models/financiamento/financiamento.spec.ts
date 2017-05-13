import {Financiamento} from './financiamento';

describe('financiamento', () => {
    
    const taxaReferencial = 0.005;
    const saldoDevedor = 20000;
    
    it('deve instanciar a classe', () => {

        let financiamento = new Financiamento(saldoDevedor,0);

        expect(financiamento).toBeTruthy();
    });
    
    it('deve inicializar o saldo devedor com o valor passado pelo construtor', () => {
        
        let financiamento = new Financiamento(saldoDevedor,taxaReferencial);
        
        expect(financiamento.SaldoDevedor).toBe(saldoDevedor);
    });
    
    it('deve trazer o saldo corrigido pela taxa referencial', () => {
        
        let financiamento = new Financiamento(saldoDevedor,taxaReferencial);
        financiamento.Corrigir();

        expect(financiamento.SaldoDevedor).toBeCloseTo(saldoDevedor * (1+taxaReferencial));
    });

    it('deve realizar o pagamento da amortizacao', () => {
        
        let financiamento = new Financiamento(saldoDevedor, 0);

        financiamento.Pagar(4000);

        expect(financiamento.SaldoDevedor).toBe(16000);
    });

    it('deve abater o saldo devedor', () => {

        let financiamento = new Financiamento(saldoDevedor, 0);

        financiamento.Abater(4000);

        expect(financiamento.SaldoDevedor).toBe(16000);
    })
});