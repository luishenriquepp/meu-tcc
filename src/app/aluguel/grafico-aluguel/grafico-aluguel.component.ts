import { Component, OnInit, Input } from '@angular/core';
import {ExtratoAluguel} from '../../models/aluguel/extrato-aluguel';
import {ExtratoFinanciamento} from '../../models/financiamento/extrato-financiamento';
import {Usuario} from '../../models/usuario';
declare var cfx;

@Component({
  selector: 'app-grafico-aluguel',
  templateUrl: './grafico-aluguel.component.html'
})
export class GraficoAluguelComponent implements OnInit {

  private areaChart: any;
  @Input() extratoAluguel: Array<ExtratoAluguel>;
  @Input() extratoFinanciamento: Array<ExtratoFinanciamento>;
  @Input() user: Usuario;
  
  ngOnInit(): void {
    this.areaChart = new cfx.Chart();
    this.areaChart.getLegendBox().setVisible(true);
    this.areaChart.getAxisY().getLabelsFormat().setFormat(cfx.AxisFormat.Currency);
    this.areaChart.setGallery(cfx.Gallery.Area);
    this.areaChart.getAnimations().getLoad().setEnabled(true);

    let title = new cfx.TitleDockable();
    title.setText("Evolução do patrimônio líquido nominal");
    
    this.areaChart.getTitles().add(title);
    
    this.buildPatrimonioLiquidoChart();
  }
    
  private buildPatrimonioLiquidoChart(): void {
    let items: Array<any> = new Array<any>();
    let data = this.areaChart.getData();
    data.setSeries(2);
    data.setPoints(this.extratoAluguel.length);
    
    let custoAcumulado: number = this.extratoAluguel[0].MontanteFGTS + this.user.disponivel;
    let custoFinAcumulado: number = this.extratoFinanciamento[0].MontanteFgts + this.user.disponivel;

    for (let i=1; i<this.extratoAluguel.length;i++) {      
      custoAcumulado += this.extratoAluguel[i].DepositoFGTS + this.extratoAluguel[i].DepositoFundo;
      custoFinAcumulado += this.extratoAluguel[i].DepositoFinInvestimento + this.extratoFinanciamento[i].DepositoFgts + this.extratoFinanciamento[i].ParcelaDescontada();
      items.push({'F': this.extratoAluguel[i].Patrimonio()-custoAcumulado, 'A': this.extratoAluguel[i].PatrimonioFinTotal() - custoFinAcumulado });
    }

    this.areaChart.setDataSource(items);
    this.areaChart.create(document.getElementById('areaChart'));
  }
}
