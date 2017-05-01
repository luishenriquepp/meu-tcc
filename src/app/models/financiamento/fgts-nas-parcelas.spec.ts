import {Parcela} from './parcela';
import {ProcessadorFinanciamento} from './processador-financiamento';
import {Usuario} from '../usuario';
import {FinanciamentoConfigBuilder} from '../builders/financiamento-config-builder';
import {ExtratoFinanciamentoBuilder} from '../builders/extrato-financiamento-builder';
import {FgtsNasParcelas} from './fgts-nas-parcelas';
import {GlobalConfiguration} from '.././global-configuration';
import {Investimento} from '../aluguel/aluguel';

describe('fgts-nas-parcelas', () => {

    let global = new GlobalConfiguration();
    let regra = new FgtsNasParcelas();
    let builder = new ExtratoFinanciamentoBuilder();
    let fundo = new Investimento();

    it('deve resgatar pela primeira vez no mes 1', () => {
        
        let extrato = builder.Build(12);
        
        regra.ParcelaAcumulada = 6000;
        extrato[1].MontanteFgts = 10000;
        regra.ProcessarFgts(extrato,12, fundo);

        expect(extrato[1].Resgate).toBeGreaterThan(0);
    });

    it('deve resgatar pela primeira vez no mes 13', () => {
        
        let extrato = builder.Build(24);
        
        regra.ParcelaAcumulada = 6000;
        extrato[13].MontanteFgts = 10000;
        regra.ProcessarFgts(extrato, 12, null);
        regra.ProcessarFgts(extrato, 24, fundo);
        
        expect(extrato[1].Resgate).toBe(0);
        expect(extrato[13].Resgate).toBeGreaterThan(0);
    });

    it('deve resgatar pela primeira vez no mes 25', () => {
        
        let extrato = builder.Build(36);
        
        regra.ParcelaAcumulada = 6000;
        extrato[25].MontanteFgts = 10000;
        
        regra.ProcessarFgts(extrato, 12, null);
        regra.ProcessarFgts(extrato, 24, null);
        regra.ProcessarFgts(extrato, 36, fundo);
        
        expect(extrato[1].Resgate).toBe(0);
        expect(extrato[13].Resgate).toBe(0);
        expect(extrato[25].Resgate).toBeGreaterThan(0);
    });

    it('deve usar a taxa maior (80%)', () => {
        
        let extrato = builder.Build(12);

        regra.ParcelaAcumulada = 6000;
        extrato[1].MontanteFgts = 12000;
        regra.ProcessarFgts(extrato, 12, fundo);

        let parcelaTotal = 6000 + extrato[12].Parcela.Parcela();
        
        expect(extrato[1].Resgate).toBe(parcelaTotal*0.8);
    });

    it('deve calcular uma nova taxa', () => {
        
        let extrato = builder.Build(12);
        
        regra.ParcelaAcumulada = 6000;
        extrato[1].MontanteFgts = 3000;
        regra.ProcessarFgts(extrato, 12, fundo);

        let parcelaTotal = 6000 + extrato[12].Parcela.Parcela();
        let tax = 3000/parcelaTotal;
        
        expect(extrato[1].Resgate).toBe(parcelaTotal*tax);
    });

    it('deve zerar a parcela acumulada ao ano apos resgatar fgts', () => {
        
        let extrato = builder.Build(12);
        
        regra.ParcelaAcumulada = 6000;
        extrato[1].MontanteFgts = 10000;
        regra.ProcessarFgts(extrato, 12, fundo);
        
        expect(regra.ParcelaAcumulada).toBe(0);
    });

    it('nao deve resgatar fgts se financiamento acabar antes do proximo ano', () => {
        
        let extrato = builder.Build(12);
        
        regra.ParcelaAcumulada = 6000;
        extrato[1].MontanteFgts = 10000;

        for(let i=1;i<=11;i++) {
            regra.ProcessarFgts(extrato, i, null);
        }
        
        expect(extrato[1].Resgate).toBe(0);
    });

    it('deve acumular o total das parcelas do ano', () => {
        
        let extrato = builder.Build(12);
        
        for (let i=1;i<=12;i++) {
            let parcelaAcumulada = regra.ParcelaAcumulada;
            regra.ProcessarFgts(extrato,i, fundo);
            expect(regra.ParcelaAcumulada).toBeGreaterThan(parcelaAcumulada);
        }
    });

    it('deve lançar a reduçao da parcela pros 12 meses', () => {
        
        let extrato = builder.Build(12);
        
        regra.ParcelaAcumulada = 6000;
        extrato[1].MontanteFgts = 10000;
        regra.ProcessarFgts(extrato, 12, fundo);
        
        for (let i=1;i<=12;i++) {
            expect(extrato[i].Parcela.ParcelaDescontada()).toBeLessThan(extrato[i].Parcela.Parcela());
            expect(extrato[i].Parcela.ParcelaDescontada()).toBeGreaterThan(0);
        }
    });

    it('nao deve lancar a reducao de parcela quando nao ha resgate', () => {
        
        let extrato = builder.Build(12);
        
        regra.ParcelaAcumulada = 6000;
        extrato[1].MontanteFgts = 10;
        regra.ProcessarFgts(extrato, 12, null);

        for (let i=1;i<=12;i++) {
            expect(extrato[i].Parcela.ParcelaDescontada()).toBe(extrato[i].Parcela.Parcela());
        }    
    });

    it('deve atualizar o valor do fundo de garantia', () => {
        let extrato = builder.Build(12);
        
        let fundo = new Investimento(10000);

        regra.ParcelaAcumulada = 6000;
        extrato[1].MontanteFgts = 10000;
        extrato[1].DepositoFgts = 400;
        regra.ProcessarFgts(extrato, 12, fundo);

        expect(fundo.ValorAcumulado).toBe(extrato[12].MontanteFgts);
    });
});