import {AdvancedProperties} from '../models/financiamento/advanced-properties';
import {AdvancedPropertiesBuilder} from '../models/builders/advanced-properties-builder';

export class FinanciamentoRepository {
        
    private static builder = new AdvancedPropertiesBuilder();
    
    private static financiamentos: Array<AdvancedProperties> = [
        FinanciamentoRepository.builder.AdvancedRichWithFgtsSaldoDevedor(), 
        FinanciamentoRepository.builder.AdvancedRichWithFgtsNaoUsarMais(),
        FinanciamentoRepository.builder.AdvancedRichWithoutFgts(),
    ];
    private static counter: number = 3;

    public Buscar(id: number): AdvancedProperties {
        return FinanciamentoRepository.financiamentos.find(t => t.Id == id);
    }

    public BuscaTodos(): Array<AdvancedProperties> {
        return FinanciamentoRepository.financiamentos;
    }

    public Adiciona(financiamento: AdvancedProperties) {
        FinanciamentoRepository.counter++;
        financiamento.Id = FinanciamentoRepository.counter;
        FinanciamentoRepository.financiamentos.push(financiamento);
    }    
}