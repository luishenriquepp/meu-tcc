import {AdvancedProperties} from '../financiamento/advanced-properties';
import {UsuarioBuilder} from './usuario-builder';
import {FinanciamentoConfigBuilder} from './financiamento-config-builder';
import {FgtsConfigBuilder} from './fgts-config-builder';

export  class AdvancedPropertiesBuilder {
    private uBuilder = new UsuarioBuilder();
    private fgtsBuilder = new FgtsConfigBuilder();
    private configBuilder = new FinanciamentoConfigBuilder();
    
    public RichWithFgtsSaldoDevedor(): AdvancedProperties {    

        let user = this.uBuilder.Build(500000, 180000, 420, 6000, true);
        let fgtsConfig = this.fgtsBuilder.Build(false, 30000, 1);
        let config = this.configBuilder.Build();

        let property = new AdvancedProperties(user,config,fgtsConfig,null)
        property.Id = 1;
        property.Identificacao = '500v180d420pFgtsDevedor';
        return property;
    }

    public RichWithFgtsNaoUsarMais(): AdvancedProperties {    

        let user = this.uBuilder.Build(500000, 180000, 420, 6000, true);
        let fgtsConfig = this.fgtsBuilder.Build(true, 30000, 0);
        let config = this.configBuilder.Build();
        
        let property = new AdvancedProperties(user,config,fgtsConfig,null)
        property.Id = 2;
        property.Identificacao = '500v180d420pFgtsEntradaNaoUsar';
        return  property;
    }

    public RichWithoutFgts(): AdvancedProperties {    

        let user = this.uBuilder.Build(500000, 180000, 420, 6000, false);
        let fgtsConfig = this.fgtsBuilder.Build(false, 0, 0);
        let config = this.configBuilder.Build();
        
        let property = new AdvancedProperties(user,config,fgtsConfig,null)
        property.Id = 3;
        property.Identificacao = '500v180d420p';
        return  property;
    }

    public MediumWithoutFgts(): AdvancedProperties {    

        let user = this.uBuilder.Build(350000, 80000, 420, 4200, false);
        let fgtsConfig = this.fgtsBuilder.Build(false, 0, 0);
        let config = this.configBuilder.Build();
        
        let property = new AdvancedProperties(user,config,fgtsConfig,null)
        property.Id = 4;
        property.Identificacao = '350v80d420p';
        return  property;
    }

    public MediumWithFgtsSaldoDevedor(): AdvancedProperties {    

        let user = this.uBuilder.Build(350000, 80000, 420, 4200, true);
        let fgtsConfig = this.fgtsBuilder.Build(true, 20000, 1);
        let config = this.configBuilder.Build();
        
        let property = new AdvancedProperties(user,config,fgtsConfig,null)
        property.Id = 5;
        property.Identificacao = '350v80d420pEntradaDevedor';
        return  property;
    }

    public PoorWithFgtsParcelas(): AdvancedProperties {    

        let user = this.uBuilder.Build(180000, 40000, 480, 3000, true);
        let fgtsConfig = this.fgtsBuilder.Build(true, 10000, 2);
        let config = this.configBuilder.Build();
        
        let property = new AdvancedProperties(user,config,fgtsConfig,null)
        property.Id = 6;
        property.Identificacao = '180v40d480pEntradaParcelas';
        return  property;
    }

    public PoorWithFgtsDevedor(): AdvancedProperties {    

        let user = this.uBuilder.Build(180000, 40000, 480, 3000, true);
        let fgtsConfig = this.fgtsBuilder.Build(true, 10000, 1);
        let config = this.configBuilder.Build();
        
        let property = new AdvancedProperties(user,config,fgtsConfig,null)
        property.Id = 7;
        property.Identificacao = '180v40d480pEntradaDevedor';
        return  property;
    }
}