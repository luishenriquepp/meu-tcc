import { Component, Input, OnChanges } from '@angular/core';

import { Usuario } from '../models/usuario';
import { Financiamento } from'../models/financiamento';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnChanges {

  @Input() financiamento: Financiamento;
  private valor: String;
  private glyph: String;

  ngOnChanges() {
    this.comprometimento();
  }

  comprometimento(): void {
    if(this.financiamento.Resultado.Comprometimento > 0.30) {
      this.valor = "text-danger";
      this.glyph = "glyphicon glyphicon-remove";        
    } else if (this.financiamento.Resultado.Comprometimento > 0.25) {
      this.valor = "text-warning";
      this.glyph = "glyphicon glyphicon-ok"; 
    } else {
      this.valor = "text-success";
      this.glyph = "glyphicon glyphicon-ok";
    }    
  }
}
