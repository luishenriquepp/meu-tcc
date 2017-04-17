import { Component, Input } from '@angular/core';
import {ExtratoAluguel} from '../../models/aluguel/aluguel';

@Component({
  selector: 'app-extrato-aluguel',
  templateUrl: './extrato-aluguel.component.html',
  styleUrls: ['./extrato-aluguel.component.css']
})
export class ExtratoAluguelComponent {

  @Input() extratoAluguel: ExtratoAluguel;
}
