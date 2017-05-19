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
    private chart: any;    
    
    constructor() {
        this.chart = new cfx.Chart(); 
    }

    ngOnInit(): void {
        this.loadChart();        
    }

    onGraphChange(event): void {
        this.popularGrafico(event);
    }

    ngOnChanges(): void {
        // this.popularGrafico('PatrimonioTotal()');
        this.patrimonioLiquido();
    }
    
    loadChart(): void {
        this.chart.getAnimations().getLoad().setEnabled(true);
        var titles = this.chart.getTitles();
        var title = new cfx.TitleDockable();
        title.setText("Evolução Patrimonial do Financiamento");
        titles.add(title);
        this.chart.getAxisY().getLabelsFormat().setFormat(cfx.AxisFormat.Currency);
        var graphHtml = document.getElementById('grafico');
        this.chart.create(graphHtml);
     }
	 
	private popularGrafico(type: string): void {
        let items = [];
        for(var i=1;i<this.extrato.length;i++) {
            items.push({ "Fin": this.extrato[i].PatrimonioTotal() });
        }
        this.chart.setDataSource(items);
    }

    private patrimonioLiquido(): void {
        let items = [];
        let totalCost: number = 0;
        for(var i=1;i<this.extrato.length;i++) {
            let ex = this.extrato[i];
            totalCost +=  ex.ParcelaDescontada() + ex.DepositoFgts;
            items.push({ "Fin": ex.PatrimonioTotal() - totalCost });
        }
        this.chart.setDataSource(items);
    }
}
