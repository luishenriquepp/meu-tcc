import {AdvancedProperties} from './advanced-properties';
import {Usuario} from '../usuario';
import {FinanciamentoConfig,Seguradora} from '../financiamento-config';
import {FinanciamentoFgtsConfig,Posterior} from '../financiamento-fgts-config';

describe('advanced properties ', () => {

    let user = new Usuario();
    let config = new FinanciamentoConfig;
    let fgtsConfig = new FinanciamentoFgtsConfig();

    it('deve criar uma instancia', () => {        
        let properties = new AdvancedProperties(user,config,fgtsConfig,null);
        expect(properties).toBeTruthy();
    });
    
    it('deve buscar as propriedades do objeto Usuario', () => {                
        user = new Usuario();
        user.disponivel = 100;
        user.nascimento = new Date();
        user.prestacoes = 20;
        user.renda = 4;
        user.valorImovel = 200;
        user.usaFGTS = true;

        let properties = new AdvancedProperties(user,config,fgtsConfig,null);

        expect(properties.Disponivel).toBe(user.disponivel);
        expect(properties.Nascimento).toBe(user.nascimento);
        expect(properties.Prestacoes).toBe(user.prestacoes);
        expect(properties.Renda).toBe(user.renda);
        expect(properties.ValorImovel).toBe(user.valorImovel);
        expect(properties.UsaFgts).toBe(user.usaFGTS);
    });

    it('deve buscar as propriedades do objeto FinanciamentoConfig', () => {                
        config.TaxaAdministrativa = 100;
        config.Seguradora = Seguradora.HDI;

        let properties = new AdvancedProperties(user,config,fgtsConfig,null);

        expect(properties.TaxaAdministrativa).toBe(config.TaxaAdministrativa);
        expect(properties.Seguradora).toBe(config.Seguradora);
    });

    it('deve buscar as propriedades do objeto FinanciamentoFgtsConfig', () => {                
        fgtsConfig.CrescimentoSalarial = 2;
        fgtsConfig.Entrada = false;
        fgtsConfig.Fgts = 200;
        fgtsConfig.Posterior = Posterior.SaldoDevedor;

        let properties = new AdvancedProperties(user,config,fgtsConfig,null);

        expect(properties.CrescimentoSalarial).toBe(fgtsConfig.CrescimentoSalarial);
        expect(properties.UsaComoEntrada).toBe(fgtsConfig.Entrada);
        expect(properties.Fgts).toBe(fgtsConfig.Fgts);
        expect(properties.Posterior).toBe(fgtsConfig.Posterior);
    });
});