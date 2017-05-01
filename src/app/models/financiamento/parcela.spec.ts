import {Parcela} from './parcela';
import {FinanciamentoConfigBuilder} from '../builders/financiamento-config-builder';
import {Usuario} from '../usuario';

describe('parcela', () => {
    
    const saldoCorrigido = 2000;
    let user = new Usuario();
    let builder = new FinanciamentoConfigBuilder();
    let config = builder.Build(user);
    let parcela = new Parcela(config,user);
    
    it('deve calcular a amortizacao', () => {
        
        let amortizacao = parcela.Amortizacao(saldoCorrigido,10);

        expect(amortizacao).toBe(saldoCorrigido/10);
    });
    
    it('deve calcular o seguro', () => {
        
        config.Seguro.DFI = 0.05;
        config.Seguro.MIP = 0.03;
        
        parcela.Amortizacao(saldoCorrigido,10);
        let seguro = parcela.Seguros;
        let expected = config.Seguro.DFI*user.valorImovel + config.Seguro.MIP*saldoCorrigido;

        expect(seguro).toBe(expected);
    });

    it('deve calcular os juros', () => {

        parcela.Amortizacao(saldoCorrigido,10);
        let juros = parcela.Juros;
        
        expect(juros).toBe(saldoCorrigido*config.JurosMensais);
    });

    it('deve retornar a parcela cheia', () => {

        let amortizacao = parcela.Amortizacao(saldoCorrigido,10);
        let parcelaCheia = parcela.Parcela();
        
        expect(parcelaCheia).toBeCloseTo(parcela.TaxaAdministrativa() + parcela.Seguros + parcela.Juros + amortizacao);
    });

    it('deve descontar a parcela usando a taxa fornecida', () => {

        parcela.Amortizacao(saldoCorrigido, 10);
        parcela.DescontaParcela(0.5);

        expect(parcela.ParcelaDescontada()).toBe(parcela.Parcela()*0.5);
    });

    it('deve retornar a parcela descontada', () => {

        parcela.Amortizacao(saldoCorrigido, 10);
        parcela.DescontaParcela(0.5);

        expect(parcela.ParcelaDescontada()).toBeLessThan(parcela.Parcela());
    });

    it('deve retornar a taxa administrativa', () => {
        
        config.TaxaAdministrativa = 100;

        expect(parcela.TaxaAdministrativa()).toBe(100);
    });
});