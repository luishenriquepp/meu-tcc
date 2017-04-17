import { Component, Input } from '@angular/core';
import {ExtratoAluguel} from '../../models/aluguel/aluguel';

@Component({
  selector: 'app-extrato-aluguel',
  templateUrl: './extrato-aluguel.component.html'
})
export class ExtratoAluguelComponent {

  @Input() extratoAluguel: ExtratoAluguel;
}
