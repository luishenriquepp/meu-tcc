import {Usuario} from '../usuario';
import {FinanciamentoConfigBuilder} from '../builders/financiamento-config-builder';
import {ExtratoFinanciamentoBuilder} from '../builders/extrato-financiamento-builder';
import {FgtsNoSaldoDevedor} from './fgts-no-saldo-devedor';
import {Investimento} from '../aluguel/aluguel';
import {Financiamento} from './financiamento';

describe('fgts no saldo devedor', () => {

    let user = new Usuario();
    let configBuilder = new FinanciamentoConfigBuilder();
    let builder = new ExtratoFinanciamentoBuilder();
    let financiamento = new Financiamento(20000,0.005);
    
    it('deve ter anualidade 2 se fgts tiver sido usado na entrada', () => {
        
        let config = configBuilder.Build(user);
        config.FGTSConfig.Entrada = true;

        let regra = new FgtsNoSaldoDevedor(config.FGTSConfig);

        expect(regra.Anualidade).toBe(2);
    });

    it('deve ter anualidade 1 se fgts nao tiver sido usado na entrada', () => {
        
        let config = configBuilder.Build(user);
        config.FGTSConfig.Entrada = false;

        let regra = new FgtsNoSaldoDevedor(config.FGTSConfig);

        expect(regra.Anualidade).toBe(1);
    });

    it('deve resgatar todo o fundo de garantia se o saldo devedor permitir', () => {
    
        let config = configBuilder.Build(user);
        config.FGTSConfig.Entrada = false;
        let extrato = builder.Build(13);
        extrato[13].MontanteFgts = 5000;
        extrato[13].SaldoAtual = 20000;
        let fundo = new Investimento(5000);

        let regra = new FgtsNoSaldoDevedor(config.FGTSConfig);
        regra.ProcessarFgts(extrato, 13, fundo, financiamento);

        expect(fundo.ValorAcumulado).toBe(0);
    });

    it('deve resgatar o necessario para quitar o saldo devedor', () => {
        let config = configBuilder.Build(user);
        config.FGTSConfig.Entrada = false;
        let extrato = builder.Build(13);
        extrato[13].MontanteFgts = 5500;
        extrato[13].SaldoAtual = 5000;
        let fundo = new Investimento(5500);

        let regra = new FgtsNoSaldoDevedor(config.FGTSConfig);
        regra.ProcessarFgts(extrato, 13, fundo, financiamento);

        expect(fundo.ValorAcumulado).toBe(500);
    });

    it('deve aumentar a unidade em 2 anos apos resgatar', () => {
        let config = configBuilder.Build(user);
        config.FGTSConfig.Entrada = false;
        let extrato = builder.Build(13);
        extrato[13].MontanteFgts = 5500;
        let fundo = new Investimento(5500);

        let regra = new FgtsNoSaldoDevedor(config.FGTSConfig);
        regra.ProcessarFgts(extrato, 13, fundo, financiamento);

        expect(regra.Anualidade).toBe(3);
    });

    it('deve chamar o metodo de saque do fundo', () => {
        let config = configBuilder.Build(user);
        config.FGTSConfig.Entrada = false;
        let extrato = builder.Build(13);
        extrato[13].MontanteFgts = 5500;
        let fundo = new Investimento(5500);

        spyOn(fundo, 'Sacar');

        let regra = new FgtsNoSaldoDevedor(config.FGTSConfig);
        regra.ProcessarFgts(extrato, 13, fundo, financiamento);

        expect(fundo.Sacar).toHaveBeenCalled();
    });

    it('deve chamar o metodo de abate do financiamento', () => {
        let config = configBuilder.Build(user);
        config.FGTSConfig.Entrada = false;
        let extrato = builder.Build(13);
        extrato[13].MontanteFgts = 5500;
        let fundo = new Investimento(5500);

        spyOn(financiamento, 'Abater');

        let regra = new FgtsNoSaldoDevedor(config.FGTSConfig);
        regra.ProcessarFgts(extrato, 13, fundo, financiamento);

        expect(financiamento.Abater).toHaveBeenCalled();
    });

    it('deve alterar o extrato', () => {
        let config = configBuilder.Build(user);
        config.FGTSConfig.Entrada = false;
        let extrato = builder.Build(13);
        extrato[13].MontanteFgts = 5500;
        extrato[13].SaldoAtual = 10000;
        let fundo = new Investimento(5500);

        let regra = new FgtsNoSaldoDevedor(config.FGTSConfig);
        regra.ProcessarFgts(extrato, 13, fundo, financiamento);
        
        expect(extrato[13].Resgate).toBe(5500);
        expect(extrato[13].SaldoAtual).toBe(4500);
        expect(extrato[13].MontanteFgts).toBe(0);
    });

    it('nao deve resgatar fora do periodo', () => {
        let config = configBuilder.Build(user);
        config.FGTSConfig.Entrada = false;
        let extrato = builder.Build(13);
        extrato[13].MontanteFgts = 5500;
        extrato[13].SaldoAtual = 10000;
        let fundo = new Investimento(5500);

        spyOn(fundo, 'Sacar');

        let regra = new FgtsNoSaldoDevedor(config.FGTSConfig);
        
        for(let i=1;i<=13;i++) {
            regra.ProcessarFgts(extrato, i, fundo, financiamento);
        }
        
        expect(fundo.Sacar).toHaveBeenCalledTimes(1);
    })
});