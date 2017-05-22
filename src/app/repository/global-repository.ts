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
    
    private static properties: Array<GlobalConfiguration> = [
        GlobalRepository.defaultProperty()
    ];
    private static counter: number = 1;

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
