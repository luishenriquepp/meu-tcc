import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {ExtratoFinanciamento} from '../../models/financiamento/extrato-financiamento';
import {Posterior} from '../../models/financiamento-fgts-config';
import {GtConfig, GenericTableComponent} from '@angular-generic-table/core';

@Component({
  selector: 'extrato-financiamento',
  templateUrl: './extrato-financiamento.component.html',
  providers: [DecimalPipe]
})
export class ExtratoFinanciamentoComponent { 
  @Input() naoUsaFgts: boolean;
  @Input() posterior: Posterior;
  @Input() extrato: Array<ExtratoFinanciamento>;
  @ViewChild(GenericTableComponent)
  private myTable: GenericTableComponent<any, any>;

  constructor(private pipe: DecimalPipe) { }

  private tableConfig: GtConfig<ExtratoFinanciamento>;

  ngOnInit(): void {
    this.myTable.gtInfo.recordLength = 25;
    this.tableConfig = {
      settings: [{
        objectKey: 'Mes',
        sort: 'enabled',
        columnOrder: 0,
        export: true,
        sortEnabled: true
      }, {
        objectKey: 'Saldo',
        sort:'disable',
        columnOrder: 1,
        export: true,
        sortEnabled: false
      }, {
        objectKey: 'CorrecaoTaxaReferencial',
        sort:'disable',
        columnOrder: 2,
        export: true,
        sortEnabled: false
      }, {
        objectKey: 'Amortizacao',
        sort:'disable',
        columnOrder: 3,
        export: true,
        sortEnabled: false
      }, {
        objectKey: 'Juros',
        sort:'disable',
        columnOrder: 4,
        export: true,
        sortEnabled: false
      }, {
        objectKey: 'Seguro',
        sort:'disable',
        columnOrder: 5,
        export: true,
        sortEnabled: false,
        visible: false
      }, {
        objectKey: 'TaxaAdministrativa',
        sort:'disable',
        columnOrder: 6,
        export: true,
        sortEnabled: false,
        visible: false
      }, {
        objectKey: 'Parcela',
        sort:'disable',
        columnOrder: 7,
        export: true,
        sortEnabled: false
      }, {
        objectKey: 'ParcelaDescontada',
        sort:'disable',
        columnOrder: 8,
        export: true,
        sortEnabled: false,
        visible: this.posterior == 2
      }, {
        objectKey: 'Resgate',
        sort:'disable',
        columnOrder: 9,
        export: true,
        sortEnabled: false,
        visible: this.naoUsaFgts && this.posterior != 0
      }, {
        objectKey: 'SaldoAtual',
        sort:'disable',
        columnOrder: 10,
        export: true,
        sortEnabled: false
      }, {
        objectKey: 'ValorImovel',
        sort:'disable',
        columnOrder: 11,
        export: true,
        sortEnabled: false
      }, {
        objectKey: 'Patrimonio',
        sort:'disable',
        columnOrder: 12,
        export: true,
        sortEnabled: false
      }, {
        objectKey: 'PatrimonioTotal',
        sort:'disable',
        columnOrder: 13,
        export: true,
        sortEnabled: false
      }],
      fields: [{
        name: 'Mês',
        objectKey: 'Mes',
        render: (row) => row.Mes.toString()
      }, {
        name: 'Dívida Inicial',
        objectKey: 'Saldo',
        render: (row) => this.pipeTransform(row.Saldo),
        value: (row) => this.pipeTransform(row.Saldo)
      }, {
        name: 'Correção TR',
        objectKey: 'CorrecaoTaxaReferencial',
        render: (row) => this.pipeTransform(row.CorrecaoTaxaReferencial)
      }, {
        name: 'Amortização',
        objectKey: 'Amortizacao',
        render: (row) => this.pipeTransform(row.Parcela.Amortizacao),
        value: (row) => this.pipeTransform(row.Amortizacao())
      }, {
        name: 'Juros',
        objectKey: 'Juros',
        render: (row) => this.pipeTransform(row.Parcela.Juros),
        value: (row) => this.pipeTransform(row.Juros())
      }, {
        name: 'Seguro',
        objectKey: 'Seguro',
        render: (row) => this.pipeTransform(row.Parcela.Seguros),
        value: (row) => this.pipeTransform(row.Seguro())
      }, {
        name: 'Taxa Administrativa',
        objectKey: 'TaxaAdministrativa',
        render: (row) => this.pipeTransform(row.Parcela.TaxaAdministrativa()),
        value: (row) => row.Parcela.TaxaAdministrativa()
      }, {
        name: 'Parcela',
        objectKey: 'Parcela',
        render: (row) => this.pipeTransform(row.Parcela.Parcela()),
        value: (row) => this.pipeTransform(row.Parcela.Parcela())
      }, {
        name: 'Parcela Descontada',
        objectKey: 'ParcelaDescontada',
        render: (row) => this.pipeTransform(row.Parcela.ParcelaDescontada()),
        value: (row) => this.pipeTransform(row.ParcelaDescontada())
      }, {
        name: 'Resgate Fgts',
        objectKey: 'Resgate',
        render: (row) => this.pipeTransform(row.Resgate)
      }, {
        name: 'Dívida Atualizada',
        objectKey: 'SaldoAtual',
        render: (row) => this.pipeTransform(row.SaldoAtual)
      }, {
        name: 'Valor Imóvel',
        objectKey: 'ValorImovel',
        render: (row) => this.pipeTransform(row.ValorImovel)
      }, {
        name: 'Patrimônio',
        objectKey: 'Patrimonio',
        render: (row) => this.pipeTransform(row.Patrimonio()),
        value: (row) => this.pipeTransform(row.Patrimonio())
      }, {
        name: 'Patrimônio Total',
        objectKey: 'PatrimonioTotal',
        render: (row) => this.pipeTransform(row.PatrimonioTotal()),
        value: (row) => this.pipeTransform(row.PatrimonioTotal())
      }],
      data: this.extrato
    }
  }
  private pipeTransform(value: number) {
    const currencyPipe = '1.2-2';
    return this.pipe.transform(value, currencyPipe);
  }

  private export(): void {
    this.myTable.exportCSV('extrato-financiamento');
  }
}
