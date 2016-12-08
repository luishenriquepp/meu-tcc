import { Component, OnInit, Input } from '@angular/core';

import { Usuario } from '../models/usuario';
import { Financiamento } from'../models/financiamento';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  @Input() financiamento: Financiamento;

  ngOnInit() {
    this.valor();
  }

  valor(): String {
    if(this.financiamento.Resultado.Comprometimento > 0.30) {
      return "text-danger";  
    } else if (this.financiamento.Resultado.Comprometimento > 0.25) {
      return "text-warning";
    } else {
      return "text-success";
    }
    
  }
}
