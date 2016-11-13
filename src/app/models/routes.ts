import { FinanciamentoPropriedadesComponent } from '../financiamento-propriedades/financiamento-propriedades.component';
import { HomeComponent } from '../home/home.component';
import { FormularioComponent } from '../formulario/formulario.component';
import { AluguelComponent } from '../aluguel/aluguel.component';
import { FinanciamentoComponent } from '../financiamento/financiamento.component';
import { ConsorcioComponent } from '../consorcio/consorcio.component';

export const Routes  = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'financiamento', component: FinanciamentoComponent },
    { path: 'aluguel', component: AluguelComponent },
    { path: 'consorcio', component: ConsorcioComponent },
];
