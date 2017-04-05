import { Aluguel } from './aluguel';

describe('aluguel', () => {
    
    it('garante que o valor da parcela do aluguel nao eh atualizado no 12 mes', () => {
        let aluguel = new Aluguel(1000);
        
        let meses = 12;
        for(let i=1;i<=meses;i++) {
            aluguel.Pagar();
        }

        expect(aluguel.PrestacaoAluguel).toBe(1000);
    });
    
    it('garante que o valor da parcela do aluguel eh atualizado no 13 mes', () => {
        let aluguel = new Aluguel(1000);
        
        let meses = 13;
        for(let i=1;i<=meses;i++) {
            aluguel.Pagar();
        }

        expect(aluguel.PrestacaoAluguel).toBeGreaterThan(1000);
    });

    it('garante que o rendimento anual do aluguel eh acrescido pela taxa informada', () => {
        let aluguel = new Aluguel(1000, 0.01);
        
        let meses = 13;
        for(let i=1;i<=meses;i++) {
            aluguel.Pagar();
        }

        expect(aluguel.PrestacaoAluguel).toBe(1000 + 1000*0.01);
    });

    it('garante que o aluguel soh foi capitalizado uma vez em 24 meses', () => {
        let aluguel = new Aluguel(1000, 0.01);
        
        let meses = 24;
        for(let i=1;i<=meses;i++) {
            aluguel.Pagar();
        }

        expect(aluguel.PrestacaoAluguel).toBe(1000 + 1000*0.01);
    });

    it('garante que o aluguel foi capitalizado duas vezes em 25 meses', () => {
        let aluguel = new Aluguel(1000, 0.01);
        
        let meses = 25;
        for(let i=1;i<=meses;i++) {
            aluguel.Pagar();
        }

        let mensalidade = 1000 + 1000*0.01;
        mensalidade = mensalidade + mensalidade * 0.01;

        expect(aluguel.PrestacaoAluguel).toBe(mensalidade);
    });
});