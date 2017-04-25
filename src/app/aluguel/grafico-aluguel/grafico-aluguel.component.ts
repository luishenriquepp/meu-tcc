import { Component, OnInit, Input } from '@angular/core';
import {ExtratoAluguel} from '../../models/aluguel/aluguel';
declare var cfx;

@Component({
  selector: 'app-grafico-aluguel',
  templateUrl: './grafico-aluguel.component.html'
})
export class GraficoAluguelComponent implements OnInit {

  private areaChart: any;
  @Input() extratoAluguel: Array<ExtratoAluguel>;
  
  constructor() { }

  ngOnInit() {
    this.areaChart = new cfx.Chart();
    this.areaChart.getLegendBox().setVisible(true);
    // this.areaChart.getAxisY().getGrids().getMajor().setVisible(false);
    this.areaChart.getAxisY().getLabelsFormat().setFormat(cfx.AxisFormat.Currency);
    this.areaChart.setGallery(cfx.Gallery.Area);
    this.areaChart.getAllSeries().setStacked(cfx.Stacked.Normal);
    this.areaChart.getAnimations().getLoad().setEnabled(true);

    let title = new cfx.TitleDockable();
    title.setText("Comparação da evolução do patrimônio líquido");
    
    this.areaChart.getTitles().add(title);
    
    this.buildPatrimonioLiquidoChart();
  }
  
  private construirGrafico(): void {
    
    let data = this.areaChart.getData();
    data.setSeries(2);
    data.setPoints(this.extratoAluguel.length);

    for (let i=0; i<this.extratoAluguel.length;i++){
      data.setItem(0, i, this.extratoAluguel[i].Patrimonio());
      data.setItem(1, i, this.extratoAluguel[i].PatrimonioFinTotal());
    }

    this.areaChart.create(document.getElementById('areaChart'));
  }
  
  private buildPatrimonioLiquidoChart(): void {
    let data = this.areaChart.getData();
    data.setSeries(2);
    data.setPoints(this.extratoAluguel.length);
    
    let custoAcumulado: number = this.extratoAluguel[0].MontanteFGTS + this.extratoAluguel[0].MontanteInvestimento;
    let custoFinAcumulado: number = 0;

    for (let i=0; i<this.extratoAluguel.length;i++) {      
      custoAcumulado += this.extratoAluguel[i].DepositoFGTS + this.extratoAluguel[i].DepositoFundo;
      data.setItem(0, i, this.extratoAluguel[i].Patrimonio()-custoAcumulado);
      // data.setItem(1, i, this.extratoAluguel[i].PatrimonioFinTotal()-custoFinAcumulado);
    }

    this.areaChart.create(document.getElementById('areaChart'));
  }
}
