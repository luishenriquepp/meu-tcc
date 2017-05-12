import {Parcela} from './parcela';
import {Usuario} from '../usuario';
import {FinanciamentoConfig} from '../financiamento-config';
import {AdvancedProperties} from './advanced-properties';

describe('parcela', () => {
    
    const saldoCorrigido = 2000;
    let user = new Usuario();
    let config = new FinanciamentoConfig();
    config.TaxaAdministrativa = 100;
    config.JurosAnuais = 20;
    
    let properties = new AdvancedProperties(null, config, null, null);
    let parcela = new Parcela(properties);
    parcela.Amortizar(saldoCorrigido,10);
    
    it('deve calcular a amortizacao', () => {
    
        expect(parcela.Amortizacao).toBe(saldoCorrigido/10);
    });
    
    xit('deve calcular o seguro', () => {
        
        // config.Seguro.DFI = 0.05;
        // config.Seguro.MIP = 0.03;
        
        // parcela.Amortizacao(saldoCorrigido,10);
        // let seguro = parcela.Seguros;
        // let expected = config.Seguro.DFI*user.valorImovel + config.Seguro.MIP*saldoCorrigido;

        // expect(seguro).toBe(expected);
    });

    it('deve calcular os juros', () => {
        
        expect(parcela.Juros).toBe(saldoCorrigido*config.JurosMensais);
    });

    it('deve retornar a parcela cheia', () => {
        
        expect(parcela.Parcela()).toBeCloseTo(parcela.TaxaAdministrativa() + parcela.Seguros + parcela.Juros + parcela.Amortizacao);
    });

    it('deve descontar a parcela usando a taxa fornecida', () => {

        parcela.DescontaParcela(0.5);

        expect(parcela.ParcelaDescontada()).toBe(parcela.Parcela()*0.5);
    });

    it('deve retornar a parcela descontada', () => {

        parcela.DescontaParcela(0.5);

        expect(parcela.ParcelaDescontada()).toBeLessThan(parcela.Parcela());
    });

    it('deve retornar a taxa administrativa', () => {

        expect(parcela.TaxaAdministrativa()).toBe(100);
    });
});