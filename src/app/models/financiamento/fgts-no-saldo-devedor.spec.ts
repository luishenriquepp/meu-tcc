import {ExtratoFinanciamentoBuilder} from '../builders/extrato-financiamento-builder';
import {FgtsNoSaldoDevedor} from './fgts-no-saldo-devedor';
import {Investimento} from '../aluguel/investimento';
import {Financiamento} from './financiamento';
import {FgtsDependency} from './fgts-dependency';

describe('fgts no saldo devedor', () => {

    let builder = new ExtratoFinanciamentoBuilder();
    let financiamento = new Financiamento(20000,0.005);
    
    it('deve ter anualidade 2 se fgts tiver sido usado na entrada', () => {

        let regra = new FgtsNoSaldoDevedor(true);

        expect(regra.Anualidade).toBe(2);
    });

    it('deve ter anualidade 1 se fgts nao tiver sido usado na entrada', () => {
        
        let regra = new FgtsNoSaldoDevedor(false);

        expect(regra.Anualidade).toBe(1);
    });

    it('deve resgatar todo o fundo de garantia se o saldo devedor permitir', () => {
    
        let extrato = builder.Build(13);
        extrato[13].MontanteFgts = 5000;
        extrato[13].SaldoAtual = 20000;
        let fundo = new Investimento(5000);
        let dependency = new FgtsDependency(extrato, financiamento, fundo)

        let regra = new FgtsNoSaldoDevedor(false);
        regra.Process(dependency, 13);

        expect(fundo.ValorAcumulado).toBe(0);
    });

    it('deve resgatar o necessario para quitar o saldo devedor', () => {

        let extrato = builder.Build(13);
        extrato[13].MontanteFgts = 5500;
        extrato[13].SaldoAtual = 5000;
        let fundo = new Investimento(5500);
        let dependency = new FgtsDependency(extrato, financiamento, fundo)

        let regra = new FgtsNoSaldoDevedor(false);
        regra.Process(dependency, 13);

        expect(fundo.ValorAcumulado).toBe(500);
    });

    it('deve aumentar a unidade em 2 anos apos resgatar', () => {

        let extrato = builder.Build(13);
        extrato[13].MontanteFgts = 5500;
        let fundo = new Investimento(5500);
        let dependency = new FgtsDependency(extrato, financiamento, fundo)

        let regra = new FgtsNoSaldoDevedor(false);
        regra.Process(dependency, 13);

        expect(regra.Anualidade).toBe(3);
    });

    it('deve chamar o metodo de saque do fundo', () => {

        let extrato = builder.Build(13);
        extrato[13].MontanteFgts = 5500;
        let fundo = new Investimento(5500);
        let dependency = new FgtsDependency(extrato, financiamento, fundo)

        spyOn(fundo, 'Sacar');

        let regra = new FgtsNoSaldoDevedor(false);
        regra.Process(dependency, 13);

        expect(fundo.Sacar).toHaveBeenCalled();
    });

    it('deve chamar o metodo de abate do financiamento', () => {

        let extrato = builder.Build(13);
        extrato[13].MontanteFgts = 5500;
        let fundo = new Investimento(5500);
        let dependency = new FgtsDependency(extrato, financiamento, fundo)

        spyOn(financiamento, 'Abater');

        let regra = new FgtsNoSaldoDevedor(false);
        regra.Process(dependency, 13);

        expect(financiamento.Abater).toHaveBeenCalled();
    });

    it('deve alterar o extrato', () => {

        let extrato = builder.Build(14);
        extrato[13].MontanteFgts = 5500;
        extrato[13].SaldoAtual = 10000;
        let fundo = new Investimento(5500);
        let dependency = new FgtsDependency(extrato, financiamento, fundo)

        let regra = new FgtsNoSaldoDevedor(false);
        regra.Process(dependency, 13);
        
        expect(extrato[13].Resgate).toBe(5500);
        expect(extrato[13].SaldoAtual).toBe(4500);
        expect(extrato[13].MontanteFgts).toBe(0);
        expect(extrato[14].SaldoAtual).toBeLessThan(extrato[13].SaldoAtual);
    });

    it('nao deve resgatar fora do periodo', () => {

        let extrato = builder.Build(13);
        extrato[13].MontanteFgts = 5500;
        extrato[13].SaldoAtual = 10000;
        let fundo = new Investimento(5500);
        let dependency = new FgtsDependency(extrato, financiamento, fundo)

        spyOn(fundo, 'Sacar');

        let regra = new FgtsNoSaldoDevedor(false);
        
        for(let i=1;i<=13;i++) {
            regra.Process(dependency, i);
        }
        
        expect(fundo.Sacar).toHaveBeenCalledTimes(1);
    })
});