import {ExtratoFinanciamento} from './extrato-financiamento';

describe('extrato financiamento', () => {

    let extrato = new ExtratoFinanciamento();
    extrato.ValorImovel = 100;
    extrato.SaldoAtual = 50;
    extrato.MontanteFgts = 30;
    extrato.RendimentoFgts = 10;
    extrato.DepositoFgts = 10;
    extrato.Resgate = 25;
    
    it('deve instanciar a classe', () => {
        
        expect(extrato).toBeTruthy();
    });

    it('deve calcular o valor do patrimonio do financiamento', () => {

        expect(extrato.Patrimonio()).toBe(100-50);
    });

    it('deve calcular o valor do patrimonio total do financiamento junto do fgts', () => {

        expect(extrato.Patrimonio()).toBe(100-50+5);
    });

    it('deve clcular o saldo inicial do fgts', () => {

        expect(extrato.FgtsSaldoInicial()).toBe(30+25-10-10);
    });
});