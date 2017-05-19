import {AdvancedProperties} from '../models/financiamento/advanced-properties';

export class FinanciamentoRepository {
    private static financiamentos: Array<AdvancedProperties> = [

    ];
    private static counter: number = 0;

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