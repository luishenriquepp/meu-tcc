import {Financiamento} from '../models/financiamento';
import {FinanciamentoBuilder} from '../models/builders/financiamento-builder';

export class FinanciamentoRepository {
    private static financiamentos: Array<Financiamento> = [
        new FinanciamentoBuilder().BuildRichUserWithFGTSFinanciamento()
    ];
    private static counter: number = 0;

    public Buscar(id: number): Financiamento {
        return FinanciamentoRepository.financiamentos.find(t => t.Id == id);
    }

    public BuscaTodos(): Array<Financiamento> {
        return FinanciamentoRepository.financiamentos;
    }

    public Adiciona(financiamento: Financiamento) {
        FinanciamentoRepository.counter++;
        financiamento.Id = FinanciamentoRepository.counter;
        FinanciamentoRepository.financiamentos.push(financiamento);
    }
}