import {GlobalConfiguration} from '../models/global-configuration';

export class GlobalRepository {
    
    public static defaultProperty(): GlobalConfiguration {
        let prop = new GlobalConfiguration();
        prop.Id = 1;
        prop.Identificacao = 'Padrão';
        prop.Descricao = 'Taxas que são carregadas inicialmente com a aplicação. Buscam simular o cenário real em 20/5/2017.';
        prop.Referencial = 0.020689;
        prop.Interna = 0.106760;
        prop.Rentabilidade = 0.11;
        prop.Imovel = 0.012;
        prop.Fundo = 0.07;
        prop.Aluguel = 0.08;
        prop.ImpostoRenda = 0.017;
        prop.Juros = 0.11;

        return prop;
    }

    public static defaultProperty2(): GlobalConfiguration {
        let prop = new GlobalConfiguration();
        prop.Id = 2;
        prop.Identificacao = 'Padrão com maior t.Imovel';
        prop.Descricao = 'Taxas que são carregadas inicialmente com a aplicação. Possui taxa de valorização de imóvel 2x maior que o padrão.';
        prop.Referencial = 0.020689;
        prop.Interna = 0.106760;
        prop.Rentabilidade = 0.11;
        prop.Imovel = 0.024;
        prop.Fundo = 0.07;
        prop.Aluguel = 0.08;
        prop.ImpostoRenda = 0.017;
        prop.Juros = 0.11;

        return prop;
    }

    public static defaultProperty3(): GlobalConfiguration {
        let prop = new GlobalConfiguration();
        prop.Id = 2;
        prop.Identificacao = 'Padrão com maior t.Rendimento';
        prop.Descricao = 'Taxas que são carregadas inicialmente com a aplicação. Possui taxa de rentabildiade de investimento = 13%.';
        prop.Referencial = 0.020689;
        prop.Interna = 0.106760;
        prop.Rentabilidade = 0.13;
        prop.Imovel = 0.012;
        prop.Fundo = 0.07;
        prop.Aluguel = 0.08;
        prop.ImpostoRenda = 0.017;
        prop.Juros = 0.11;

        return prop;
    }
    
    private static properties: Array<GlobalConfiguration> = [
        GlobalRepository.defaultProperty(), GlobalRepository.defaultProperty2(), GlobalRepository.defaultProperty3()
    ];
    private static counter: number = 2;

    public Buscar(id: number): GlobalConfiguration {
        return GlobalRepository.properties.find(t => t.Id == id);
    }

    public BuscaTodos(): Array<GlobalConfiguration> {
        return GlobalRepository.properties;
    }

    public Adiciona(property: GlobalConfiguration) {
        GlobalRepository.counter++;
        property.Id = GlobalRepository.counter;
        GlobalRepository.properties.push(property);
    }
}
