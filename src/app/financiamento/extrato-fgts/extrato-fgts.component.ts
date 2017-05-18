import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {GtConfig, GenericTableComponent} from '@angular-generic-table/core';

import {ExtratoFinanciamento} from '../../models/financiamento/extrato-financiamento';

export interface rowData {
  Mes: number;
  FgtsSaldoInicial(): number;
  RendimentoFgts: number;
  DepositoFgts: number;
  Resgate: number;
  MontanteFgts: number;
}

@Component({
  selector: 'extrato-fgts',
  templateUrl: './extrato-fgts.component.html',
  styleUrls: ['./extrato-fgts.component.css'],
  providers: [DecimalPipe]
})
export class ExtratoFgtsComponent implements OnInit {

  constructor(private pipe: DecimalPipe) { }
  
  @Input() extrato: Array<rowData>;

  @ViewChild(GenericTableComponent)
  private myTable: GenericTableComponent<any, any>;

  configObject: GtConfig<rowData>;
  
  ngOnInit(): void {    
    this.myTable.gtInfo.recordLength = 25;
    
    this.configObject = {
      settings:[{
        objectKey:'Mes',
        sort:'enabled',
        columnOrder:0,
        export: true,
        sortEnabled: true
      }, {
        objectKey:'FgtsSaldoInicial',
        sort:'disable',
        columnOrder:1,
        export: true,
        sortEnabled: false
      },{
        objectKey:'RendimentoFgts',
        sort:'disable',
        columnOrder:2,
        export: true,
        sortEnabled: false
      }, {
        objectKey:'DepositoFgts',
        sort:'disable',
        columnOrder:3,
        export: true,
        sortEnabled: false
      }, {
        objectKey:'Resgate',
        sort:'disable',
        columnOrder:4,
        export: true,
        sortEnabled: false
      }, {
        objectKey:'MontanteFgts',
        sort:'disable',
        columnOrder:5,
        export: true,
        sortEnabled: false
      }],
      fields:[{ 
        name: 'Mês',
        objectKey: 'Mes',
        classNames: 'col-md-1',
        render: (row) => row.Mes.toString()       
      }, {
        name:'Saldo Inicial',
        objectKey:'FgtsSaldoInicial',
        classNames: 'text-right',
        render: (row) => this.pipeTransform(row.FgtsSaldoInicial()),
        value: (row) => row.FgtsSaldoInicial()
      },{
        name:'Rendimentos',
        objectKey:'RendimentoFgts',
        classNames: 'text-right',
        render: (row) => this.pipeTransform(row.RendimentoFgts)
      },{
        name: 'Créditos',
        objectKey: 'DepositoFgts',
        classNames: 'text-right',
        render: (row) => this.pipeTransform(row.DepositoFgts)
      }, {
        name:'Resgate',
        objectKey:'Resgate',
        classNames: 'text-right',
        render: (row) => this.pipeTransform(row.Resgate)
      }, {
        name:'Total Fgts',
        objectKey:'MontanteFgts',
        classNames: 'text-right',
        render: (row) => this.pipeTransform(row.MontanteFgts)
      }],
      data: this.extrato
    };
  }

  private pipeTransform(value: number) {
    const currencyPipe = '1.2-2';
    return this.pipe.transform(value, currencyPipe);
  }

  private export() {
    this.myTable.exportCSV('extrato-fgts');
  }
}
