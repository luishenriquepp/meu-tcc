import {ProcessadorFinanciamento} from './processador-financiamento';
import {Financiamento} from './financiamento';
import {Aluguel} from '../aluguel/aluguel';
import {Investimento} from '../aluguel/investimento';
import {Usuario} from '../usuario';
import {FgtsNasParcelas} from './fgts-nas-parcelas';
import {FgtsNoSaldoDevedor} from './fgts-no-saldo-devedor';
import {GlobalConfiguration} from '../global-configuration';
import {AdvancedProperties} from './advanced-properties';

describe('processador financiamento', () => {
    
        let global = new GlobalConfiguration();
        let user = new Usuario();
        user.GlobalConfiguration = global;
        const fgts = 10000;

        let fin = new Financiamento(150000, 0.005);
        let imovel = new Investimento(200000);
        let salario = new Aluguel(2);
        let fundo = new Investimento(fgts);
        let properties = new AdvancedProperties(user, null, null, null);

    xit('deve inicializar o extrato com fgts', () => {
        
        user.prestacoes = 1;
        
        let processador = new ProcessadorFinanciamento(fin, imovel, salario, null, fundo);
        processador.Processor = new FgtsNoSaldoDevedor(true);
        processador.Processar();

        let ext = processador.Extrato[0];
        expect(ext.Resgate).toBe(0);
        expect(ext.ValorImovel).toBe(user.valorImovel);
        expect(ext.SaldoAtual).toBe(user.valorImovel - user.disponivel - fgts); 
        expect(ext.Parcela).toBeUndefined();
        expect(ext.CorrecaoTaxaReferencial).toBe(0);
        expect(ext.DepositoFgts).toBe(0);
        expect(ext.MontanteFgts).toBe(0);
        expect(ext.RendimentoFgts).toBe(0);
    });

    it('deve inicializar o extrato sem fgts', () => {

        user.prestacoes = 1;
        user.valorImovel = 200000;
        user.disponivel = 75000;

        let processador = new ProcessadorFinanciamento(fin, imovel, salario, null, fundo);
        processador.Processor = new FgtsNoSaldoDevedor(false);
        processador.Processar();

        let ext = processador.Extrato[0];
        expect(ext.Resgate).toBe(0);
        expect(ext.ValorImovel).toBe(user.valorImovel);
        expect(ext.SaldoAtual).toBe(user.valorImovel - user.disponivel);        
        expect(ext.Parcela).toBeUndefined();
        expect(ext.CorrecaoTaxaReferencial).toBe(0);
        expect(ext.DepositoFgts).toBe(0);
        expect(ext.MontanteFgts).toBe(0);
        expect(ext.RendimentoFgts).toBe(0);
    });
    
    it('deve setar instancia de IProcessFgts', () => {
        let processador = new ProcessadorFinanciamento(null, null, null, null, null);
        processador.Processor = new FgtsNasParcelas();;

        expect(processador.Processor).toBeDefined();
    });

    it('deve chamar o metodo depositar do imovel', () => {
                
        user.prestacoes = 12;

        spyOn(imovel, 'Depositar');
        
        let processador = new ProcessadorFinanciamento(fin, imovel, salario, null);
        processador.Processor = new FgtsNoSaldoDevedor(false);
        processador.Processar();

        expect(imovel.Depositar).toHaveBeenCalledTimes(12);
    });

    it('deve chamar o metodo pagar do financiamento', () => {

        user.prestacoes = 12;

        spyOn(fin, 'Pagar');
        
        let processador = new ProcessadorFinanciamento(fin, imovel, salario, null);
        processador.Processor = new FgtsNoSaldoDevedor(false);
        processador.Processar();    

        expect(fin.Pagar).toHaveBeenCalledTimes(12);
    });

    it('deve chamar o metodo pagar do salario', () => {
        
        user.prestacoes = 12;

        spyOn(salario, 'Pagar');
        
        let processador = new ProcessadorFinanciamento(fin, imovel, salario, null);
        processador.Processor = new FgtsNoSaldoDevedor(false);
        processador.Processar();    

        expect(salario.Pagar).toHaveBeenCalledTimes(12);
    });

    it('deve chamar o metodo process do fgtsProcessor se o usuario usar fgts', () => {
        
        user.prestacoes = 12;
        
        let processador = new ProcessadorFinanciamento(fin, imovel, salario, null, fundo);
        let iProcessor = new FgtsNoSaldoDevedor(true); 
        processador.Processor = iProcessor;                
        spyOn(iProcessor, 'Process');
        processador.Processar();

        expect(iProcessor.Process).toHaveBeenCalledTimes(12);
    });

    it('deve gerar o tamanho do extrato de acordo com as prestacoes do usuario', () => {
        
        user.prestacoes = 12;

        let processador = new ProcessadorFinanciamento(fin, imovel, salario, null);
        processador.Processor = new FgtsNoSaldoDevedor(false);  

        processador.Processar();

        expect(processador.Extrato.length).toBe(13);
    });

    it('deve preencher os campos do extrato', () => {
        
        user.prestacoes = 2;
        
        let processador = new ProcessadorFinanciamento(fin, imovel, salario, null);
        processador.Processor = new FgtsNoSaldoDevedor(false);
        processador.Processar();

        let ext = processador.Extrato;
        expect(ext[1].Resgate).toBe(0);
        expect(ext[1].DepositoFgts).toBe(0);
        expect(ext[1].MontanteFgts).toBe(0);
        expect(ext[1].RendimentoFgts).toBe(0);
        
        expect(ext[1].ValorImovel).toBeGreaterThan(ext[0].ValorImovel);
        expect(ext[1].SaldoAtual).toBeLessThan(ext[0].SaldoAtual);        
        expect(ext[1].Parcela).toBeDefined();
        expect(ext[1].CorrecaoTaxaReferencial).toBeGreaterThan(0);
    });
});