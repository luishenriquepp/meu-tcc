import { Component, OnInit, Input, OnChanges } from '@angular/core';


declare var cfx;

@Component({
  selector: 'app-grafico-financiamento-2',
  templateUrl: './grafico-financiamento-2.component.html',
  styleUrls: ['./grafico-financiamento-2.component.css']
})
export class GraficoFinanciamento2Component implements OnInit, OnChanges {
  
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
        this.PopulaComFinanciamento('patrimonio');
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
        // for(var i=1;i<this.financiamento.Prestacoes.length;i++) {
        //     items.push({ "Fin": this.financiamento.Prestacoes[i][type] });
        // }
        this.chart1.setDataSource(items);
    }
}
