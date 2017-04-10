import { ValorPresente } from './valor-presente';

describe('valor presente', () => {    
    it('deve calcular usando a formula do valor presente liquido', () => {
        const valor = 200;
        const parcela = 5;

        let vpl = ValorPresente.Calcula(valor, parcela);

        expect(vpl).toBeCloseTo(190.29);
    });
});