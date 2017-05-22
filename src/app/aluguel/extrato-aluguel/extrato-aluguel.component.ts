import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {ExtratoAluguel} from '../../models/aluguel/extrato-aluguel';
import {GtConfig, GenericTableComponent} from '@angular-generic-table/core';

@Component({
  selector: 'app-extrato-aluguel',
  templateUrl: './extrato-aluguel.component.html',
  providers: [DecimalPipe]
})
export class ExtratoAluguelComponent implements OnInit {

  @Input() extratoAluguel: Array<ExtratoAluguel>;
  @ViewChild(GenericTableComponent)
  private myTable: GenericTableComponent<any, any>;
  private counter: number  = 0;

  constructor(private pipe: DecimalPipe) { }

  private tableConfig: GtConfig<ExtratoAluguel>;

  ngOnInit(): void {
    this.myTable.gtInfo.recordLength = 25;
    this.tableConfig = {
      settings: [{
        objectKey: 'Mes',
        sort: 'enabled',
        columnOrder: this.counter++,
        export: true,
        sortEnabled: true
      }, {
        objectKey: 'Aluguel',
        sort: 'disable',
        columnOrder: this.counter++,
        export: true,
        sortEnabled: false
      }, {
        objectKey: 'Parcela',
        sort: 'disable',
        columnOrder: this.counter++,
        export: true,
        sortEnabled: false        
      }, {
        objectKey: 'RendimentoFundo',
        sort: 'disable',
        columnOrder: this.counter++,
        export: true,
        sortEnabled: false,
        visible: false
      }, {
        objectKey: 'DepositoFundo',
        sort: 'disable',
        columnOrder: this.counter++,
        sortEnabled: false,
        visible: false
      }, {
        objectKey: 'RendimentoFGTS',
        sort: 'disable',
        columnOrder: this.counter++,
        export: true,
        sortEnabled: false,
        visible: false        
      }, {
        objectKey: 'DepositoFGTS',
        sort: 'disable',
        columnOrder: this.counter++,
        export: true,
        sortEnabled: false,
        visible: false
      }, {
        objectKey: 'SaldoParcial',
        sort: 'disable',
        columnOrder: this.counter++,
        export: true,
        sortEnabled: false
      }, {
        objectKey: 'Patrimonio',
        sort: 'disable',
        columnOrder: this.counter++,
        export: true,
        sortEnabled: false
      }, {
        objectKey: 'MontanteFGTS',
        sort: 'disable',
        columnOrder: this.counter++,
        export: true,
        sortEnabled: false
      }, {
        objectKey: 'MontanteInvestimento',
        sort: 'disable',
        columnOrder: this.counter++,
        export: true,
        sortEnabled: false        
      }, {
        objectKey: 'PatrimonioFinanciamento',
        sort: 'disable',
        columnOrder: this.counter++,
        export: true,
        sortEnabled: false        
      }, {
        objectKey: 'MontanteFinInvestimento',
        sort: 'disable',
        columnOrder: this.counter++,
        export: true,
        sortEnabled: false,
        visible: false     
      }, {
        objectKey: 'DepositoFinInvestimento',
        sort: 'disable',
        columnOrder: this.counter++,
        export: true,
        sortEnabled: false,
        visible: false
      }, {
        objectKey: 'RendimentoFinInvestimento',
        sort: 'disable',
        columnOrder: this.counter++,
        export: true,
        sortEnabled: false,
        visible: false      
      }, {
        objectKey: 'PatrimonioFinTotal',
        sort: 'disable',
        columnOrder: this.counter++,
        export: true,
        sortEnabled: false        
      }],
      fields: [{
        name: 'Mês',
        objectKey: 'Mes',
        render: (row) => row.Mes.toString()
      }, {
        name: 'Aluguel',
        objectKey: 'Aluguel',
        render: (row) => this.pipeTransform(row.Aluguel)    
      }, {
        name: 'Investimento Rendimento',
        objectKey: 'RendimentoFundo',
        render: (row) => this.pipeTransform(row.RendimentoFundo)
      }, {
        name: 'Investimento Depósito',
        objectKey: 'DepositoFundo',
        render: (row) => this.pipeTransform(row.DepositoFundo)
      }, {
        name: ' Fgts Rendimento',
        objectKey: 'RendimentoFGTS',
        render: (row) => this.pipeTransform(row.RendimentoFGTS)
      }, {
        name: 'Fgts Depósito',
        objectKey: 'DepositoFGTS',
        render: (row) => this.pipeTransform(row.DepositoFGTS)
      }, {
        name: 'Valor Acrescentado',
        objectKey: 'SaldoParcial',
        render: (row) => this.pipeTransform(row.SaldoParcial())
      }, {
        name: 'Patrimônio Aluguel',
        objectKey: 'Patrimonio',
        render: (row) => this.pipeTransform(row.Patrimonio())    
      }, {
        name: 'Fgts Acumulado',
        objectKey: 'MontanteFGTS',
        render: (row) => this.pipeTransform(row.MontanteFGTS)
      }, {
        name: 'Investimento Acumulado',
        objectKey: 'MontanteInvestimento',
        render: (row) => this.pipeTransform(row.MontanteInvestimento)
      }, {
        name: 'Patrimônio Financiamento',
        objectKey: 'PatrimonioFinanciamento',
        render: (row) => this.pipeTransform(row.PatrimonioFinanciamento)
      }, {
        name: 'Investimento Financiamento Acumulado',
        objectKey: 'MontanteFinInvestimento',
        render: (row) => this.pipeTransform(row.MontanteFinInvestimento)
      }, {
        name: 'Investimento Financiamento Depósito',
        objectKey: 'DepositoFinInvestimento',
        render: (row) => this.pipeTransform(row.DepositoFinInvestimento)
      }, {
        name: 'Investimento Financiamento Rendimento',
        objectKey: 'RendimentoFinInvestimento',
        render: (row) => this.pipeTransform(row.RendimentoFinInvestimento)
      }, {
        name: 'Patrimônio Financiamento Total',
        objectKey: 'PatrimonioFinTotal',
        render: (row) => this.pipeTransform(row.PatrimonioFinTotal())
      }, {
        name: 'Parcela',
        objectKey: 'Parcela',
        render: (row) => this.pipeTransform(row.Parcela)
      }],
      data: this.extratoAluguel
    }
  }
  private pipeTransform(value: number) {
    const currencyPipe = '1.2-2';
    return this.pipe.transform(value, currencyPipe);
  }
  
  private export(): void {
    this.myTable.exportCSV('extrato-comparacao-aluguel.csv');
  }
}