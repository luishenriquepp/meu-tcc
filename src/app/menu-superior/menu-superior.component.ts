import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit {

  private title: string = 'Home';
  private aluguel: string = 'Aluguel';
  private financiamento: string = 'Financiamento';
  private consorcio: string = 'Consórcio';
  
  constructor() { }

  ngOnInit() {
  }

}
