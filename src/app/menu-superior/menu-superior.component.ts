import {Component} from '@angular/core';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent {

  private title: string = 'SimImóveis';
  private aluguel: string = 'Aluguel';
  private financiamento: string = 'Financiamento';
  private consorcio: string = 'Consórcio';
  private global: string = 'Taxas';
}
