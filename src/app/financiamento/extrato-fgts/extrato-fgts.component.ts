import { Component, OnInit, Input } from '@angular/core';

import { Financiamento } from'../../models/financiamento';

@Component({
  selector: 'app-extrato-fgts',
  templateUrl: './extrato-fgts.component.html',
  styleUrls: ['./extrato-fgts.component.css']
})
export class ExtratoFgtsComponent implements OnInit {

  @Input() financiamento: Financiamento;
  
  constructor() { }

  ngOnInit() {
  }

}
