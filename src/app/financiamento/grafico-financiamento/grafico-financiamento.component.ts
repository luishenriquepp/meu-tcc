import { Component, OnInit, Input, OnChanges } from '@angular/core';

import {ExtratoFinanciamento} from '../../models/financiamento/extrato-financiamento';

declare var cfx;

@Component({
  selector: 'grafico-financiamento',
  templateUrl: './grafico-financiamento.component.html',
  styleUrls: ['./grafico-financiamento.component.css']
})
export class GraficoFinanciamentoComponent implements OnInit, OnChanges {
  
    @Input() extrato: Array<ExtratoFinanciamento>;
    
    constructor() {
        this.chart1 = new cfx.Chart(); 
    }
    opaopa: HTMLDivElement;
    chart1: any;    

    ngOnInit() {
        this.loadChart();        
    }

    onGraphChange(event): void {
        this.PopulaComFinanciamento(event);
    }

    ngOnChanges() {
        this.PopulaComFinanciamento('PatrimonioTotal()');
    }
    
    loadChart(): void {
        this.chart1.getAnimations().getLoad().setEnabled(true);
        var titles = this.chart1.getTitles();
        var title = new cfx.TitleDockable();
        title.setText("Evolução do Patrimônio a Valor Presente");
        titles.add(title);
        this.chart1.getAxisY().getLabelsFormat().setFormat(cfx.AxisFormat.Currency);
        var opa = document.getElementById('oi');
        this.chart1.create(opa);
     }
	 
	PopulaComFinanciamento(type: string): void {
        let items = [];
        for(var i=1;i<this.extrato.length;i++) {
            items.push({ "Fin": this.extrato[i][type] });
        }
        this.chart1.setDataSource(items);
    }
}