import { Component, OnInit, Input } from '@angular/core';
import {ExtratoAluguel} from '../../models/aluguel/aluguel';
declare var cfx;

@Component({
  selector: 'app-grafico-aluguel',
  templateUrl: './grafico-aluguel.component.html'
})
export class GraficoAluguelComponent implements OnInit {

  private chart: any;
  @Input() extratoAluguel: Array<ExtratoAluguel>;
  
  constructor() { }

  ngOnInit() {
    this.chart = new cfx.Chart();
    this.construirGrafico();
  }
  
  private construirGrafico(): void {
    // this.chart.getAnimations().getLoad().setEnabled(true);
    var td;
    td = new cfx.TitleDockable();
    td.setText("3D Normal Stacked Area");
    this.chart.getTitles().add(td);
    this.chart.getLegendBox().setVisible(false);
    this.chart.setGallery(cfx.Gallery.Area);
    this.chart.getView3D().setEnabled(true);
    this.chart.getAllSeries().setStacked(cfx.Stacked.Normal);
    var data = this.chart.getData();
    data.setSeries(2);
    data.setPoints(this.extratoAluguel.length);

    for (let i=0; i<this.extratoAluguel.length;i++){
      data.setItem(0, i, this.extratoAluguel[i].Patrimonio());
      data.setItem(1, i, this.extratoAluguel[i].PatrimonioFinTotal());
    }

    var opa = document.getElementById('div_Chart');
    this.chart.create(opa);
  }
}
