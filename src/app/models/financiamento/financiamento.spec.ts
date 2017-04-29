import {Financiamento,ProcessadorFinanciamento} from './financiamento';
import {Usuario} from '../usuario';
import {FinanciamentoConfigBuilder} from '../builders/financiamento-config-builder';

describe('financiamento', () => {
    
    xit('deve inicializar o instante zero', () => {

        let user = new Usuario();
        user.valorImovel = 200000;
        user.prestacoes = 320;
        user.usaFGTS = true;
        user.FGTS = 40000;
        user.disponivel = 50000;
        let builder = new FinanciamentoConfigBuilder();
        let config = builder.Build(user);

        let processador = new ProcessadorFinanciamento(user, config);
        processador.Processar();

        let ex = processador.Extrato[0];
        
        expect(ex.SaldoAtual).toBe(200000-90000);
        expect(ex.CorrecaoTaxaReferencial).toBe(0);
        expect(ex.DepositoFgts).toBe(0);
        expect(ex.RendimentoFgts).toBe(0);
        expect(ex.MontanteFgts).toBe(0);
        expect(ex.Parcela).toBeUndefined();
        expect(ex.ValorImovel).toBe(user.valorImovel);
        expect(ex.Resgate).toBe(0);
    });
});