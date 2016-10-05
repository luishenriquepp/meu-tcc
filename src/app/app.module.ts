import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { MainComponent } from './main/main.component';
import { TabelaVplComponent } from './tabela-vpl/tabela-vpl.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { GoogleChartComponent } from './google-chart/google-chart.component';
import { GraficoFinanciamentoComponent } from './grafico-financiamento/grafico-financiamento.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    MenuSuperiorComponent,
    MainComponent,
    TabelaVplComponent,
    ResultadoComponent,
    GoogleChartComponent,
    GraficoFinanciamentoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
