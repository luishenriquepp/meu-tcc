import { Component, Input, OnChanges } from '@angular/core';

import { Usuario } from '../../models/usuario';

@Component({
  selector: 'resultado-financiamento',
  templateUrl: './resultado-financiamento.component.html',
  styleUrls: ['./resultado-financiamento.component.css']
})
export class ResultadoFinanciamentoComponent implements OnChanges {

  private valor: String;
  private glyph: String;

  ngOnChanges() {
    this.comprometimento();
  }

  comprometimento(): void {
    // if(this.financiamento.Resultado.Comprometimento > 0.30) {
    //   this.valor = "text-danger";
    //   this.glyph = "glyphicon glyphicon-remove";        
    // } else if (this.financiamento.Resultado.Comprometimento > 0.25) {
    //   this.valor = "text-warning";
    //   this.glyph = "glyphicon glyphicon-ok"; 
    // } else {
    //   this.valor = "text-success";
    //   this.glyph = "glyphicon glyphicon-ok";
    // }    
  }
}
