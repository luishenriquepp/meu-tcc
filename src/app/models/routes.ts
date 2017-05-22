import { FinanciamentoPropriedadesComponent } from '../financiamento/financiamento-propriedades/financiamento-propriedades.component';
import { HomeComponent } from '../home/home.component';
import { FormularioComponent } from '../financiamento/formulario/formulario.component';
import { AluguelComponent } from '../aluguel/aluguel.component';
import { FinanciamentoComponent } from '../financiamento/financiamento.component';
import { ConsorcioComponent } from '../consorcio/consorcio.component';
import { GlobalConfigurationComponent } from '../global-configuration/global-configuration.component';

export const Routes  = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'financiamento', component: FinanciamentoComponent },
    { path: 'aluguel', component: AluguelComponent },
    { path: 'consorcio', component: ConsorcioComponent },
    { path: 'taxas', component: GlobalConfigurationComponent },
];
