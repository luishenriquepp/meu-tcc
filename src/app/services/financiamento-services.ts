import { Injectable } from '@angular/core';

import {FinanciamentoRepository} from '../repository/financiamento-repository';
import {AdvancedProperties} from '../models/financiamento/advanced-properties';

@Injectable()
export class FinanciamentoService {
    private repository: FinanciamentoRepository = new FinanciamentoRepository();

    public Busca(id: number): Promise<AdvancedProperties> {
        let promise: Promise<AdvancedProperties> = new Promise((financiamento) => {
            setTimeout(() => {
                let fin = this.repository.Buscar(id);
                financiamento(fin);
            },1400);
        });
        return promise;
    }

    public Adiciona(financiamento: AdvancedProperties): Promise<AdvancedProperties> {
        let promise: Promise<AdvancedProperties> = new Promise((finan) => {
            setTimeout(() => {
                this.repository.Adiciona(financiamento);
                finan(financiamento);
            },1400);
        });
        return promise;
    }

    public BuscaTodos(): Promise<AdvancedProperties[]> {
        let promise: Promise<Array<AdvancedProperties>> = new Promise((financiamentos) => {
            setTimeout(() => {
                let fin = this.repository.BuscaTodos();
                financiamentos(fin);
            }, 800);
        });
        return promise;
    }
}