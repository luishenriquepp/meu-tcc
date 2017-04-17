import { Injectable } from '@angular/core';

import { Financiamento } from '../models/financiamento';
import { FinanciamentoRepository } from '../repository/financiamento-repository';

@Injectable()
export class FinanciamentoService {
    private repository: FinanciamentoRepository = new FinanciamentoRepository();

    public Busca(id: number): Promise<Financiamento> {
        let promise: Promise<Financiamento> = new Promise((financiamento) => {
            setTimeout(() => {
                let fin = this.repository.Buscar(id);
                financiamento(fin);
            },1400);
        });
        return promise;
    }

    public Adiciona(financiamento: Financiamento): Promise<Financiamento> {
        let promise: Promise<Financiamento> = new Promise((finan) => {
            setTimeout(() => {
                this.repository.Adiciona(financiamento);
                finan(financiamento);
            },1400);
        });
        return promise;
    }

    public BuscaTodos(): Promise<Financiamento[]> {
        let promise: Promise<Array<Financiamento>> = new Promise((financiamentos) => {
            setTimeout(() => {
                let fin = this.repository.BuscaTodos();
                financiamentos(fin);
            }, 800);
        });
        return promise;
    }
}