import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit {

  private title: string = 'Simulações para Financiamento de Imóveis';
  private aluguel: string = 'Aluguel';
  private financiamento: string = 'Financiamento';
  private consorcio: string = 'Consórcio';
  
  constructor() { }

  ngOnInit() {
  }

}
