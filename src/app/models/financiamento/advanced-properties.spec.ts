import {AdvancedProperties} from './advanced-properties';
import {Usuario} from '../usuario';
import {FinanciamentoConfig,Seguradora} from '../financiamento-config';
import {FinanciamentoFgtsConfig,Posterior} from '../financiamento-fgts-config';
import {FinanciamentoSeguro} from '../financiamento-seguro';
import {SeguradoraHdi} from '../seguradora-hdi';

describe('advanced properties ', () => {

    let usuario = new Usuario();
    let config = new FinanciamentoConfig;
    let fgtsConfig = new FinanciamentoFgtsConfig();
    let seguro = new FinanciamentoSeguro(new SeguradoraHdi());
    let properties = new AdvancedProperties(usuario,config,fgtsConfig,null);

    it('deve criar uma instancia', () => {        

        expect(properties).toBeTruthy();
    });
    
    it('deve buscar as propriedades do objeto Usuario', () => {        
        
        usuario.disponivel = 100;
        usuario.nascimento = new Date();
        usuario.prestacoes = 20;
        usuario.renda = 4;
        usuario.valorImovel = 200;
        usuario.usaFGTS = true;

        expect(properties.Disponivel()).toBe(usuario.disponivel);
        expect(properties.Nascimento()).toBe(usuario.nascimento);
        expect(properties.Prestacoes()).toBe(usuario.prestacoes);
        expect(properties.Renda()).toBe(usuario.renda);
        expect(properties.ValorImovel()).toBe(usuario.valorImovel);
        expect(properties.UsaFgts()).toBe(usuario.usaFGTS);
    });

    it('deve buscar as propriedades do objeto FinanciamentoConfig', () => {        
        
        config.TaxaAdministrativa = 100;
        config.Seguradora = Seguradora.HDI;

        expect(properties.TaxaAdministrativa()).toBe(config.TaxaAdministrativa);
        expect(properties.Seguradora()).toBe(config.Seguradora);
    });

    it('deve buscar as propriedades do objeto FinanciamentoFgtsConfig', () => {        
        
        fgtsConfig.CrescimentoSalarial = 2;
        fgtsConfig.Entrada = false;
        fgtsConfig.Fgts = 200;
        fgtsConfig.Posterior = Posterior.SaldoDevedor;

        expect(properties.CrescimentoSalarial()).toBe(fgtsConfig.CrescimentoSalarial);
        expect(properties.UsaComoEntrada()).toBe(fgtsConfig.Entrada);
        expect(properties.Fgts()).toBe(fgtsConfig.Fgts);
        expect(properties.Posterior()).toBe(fgtsConfig.Posterior);
    });

    xit('deve buscar as propriedades do objeto Seguro', () => {        
        
        seguro.DFI = 20;
        seguro.MIP = 100;

        expect(properties.DFI()).toBe(seguro.DFI);
        expect(properties.MIP).toBe(seguro.MIP);
    });
});