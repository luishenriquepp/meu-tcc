import {AdvancedProperties} from '../financiamento/advanced-properties';
import {UsuarioBuilder} from './usuario-builder';
import {FinanciamentoConfigBuilder} from './financiamento-config-builder';
import {FgtsConfigBuilder} from './fgts-config-builder';

export  class AdvancedPropertiesBuilder {
    private uBuilder = new UsuarioBuilder();
    private fgtsBuilder = new FgtsConfigBuilder();
    private configBuilder = new FinanciamentoConfigBuilder();
    
    public AdvancedRichWithFgtsSaldoDevedor(): AdvancedProperties {    

        let user = this.uBuilder.Build(500000, 180000, 420, 6000, true);
        let fgtsConfig = this.fgtsBuilder.Build(false, 30000, 1);
        let config = this.configBuilder.Build();

        let property = new AdvancedProperties(user,config,fgtsConfig,null)
        property.Id = 1;
        property.Identificacao = '500v180d420pFgtsDevedor';
        return property;
    }

    public AdvancedRichWithFgtsNaoUsarMais(): AdvancedProperties {    

        let user = this.uBuilder.Build(500000, 180000, 420, 6000, true);
        let fgtsConfig = this.fgtsBuilder.Build(true, 30000, 0);
        let config = this.configBuilder.Build();
        
        let property = new AdvancedProperties(user,config,fgtsConfig,null)
        property.Id = 2;
        property.Identificacao = '500v180d420pFgtsEntradaNaoUsar';
        return  property;
    }

    public AdvancedRichWithoutFgts(): AdvancedProperties {    

        let user = this.uBuilder.Build(500000, 180000, 420, 6000, false);
        let fgtsConfig = this.fgtsBuilder.Build(false, 0, 0);
        let config = this.configBuilder.Build();
        
        let property = new AdvancedProperties(user,config,fgtsConfig,null)
        property.Id = 3;
        property.Identificacao = '500v180d420p';
        return  property;
    }
}