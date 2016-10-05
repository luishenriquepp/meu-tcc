import {Component,Input} from '@angular/core';
import {GoogleChartComponent} from '../google-chart/google-chart.component';

@Component({
  selector: 'app-grafico-financiamento',
  templateUrl: 'grafico-financiamento.component.html',
  styleUrls: ['grafico-financiamento.component.css'],
})

export class GraficoFinanciamentoComponent {

  @Input() exibirTabela: boolean;

public pie_ChartData = [
      ['Year', 'Sales', 'Expenses'],
      ['1',  1000,      400],
      ['2',  1170,      460],
      ['3',  660,       1120],
      ['4',  1030,      540],
      ['5',  1030,      540],
      ['6',  1030,      540],
      ['7',  1030,      540],
      ['8',  1030,      540],
      ['9',  1030,      540],
      ];
  
  public pie_ChartOptions  = {
      title: 'Company Performance',
      hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
      vAxis: {minValue: 0, ticks: [0,1,2,3,4,5,6,7,8,9,10]},
      height: 289,
      legend: {position: 'top', maxLines: 1},
  };
}