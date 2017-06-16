import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FinanciamentoComponent } from './financiamento/financiamento.component';
import { AluguelComponent } from './aluguel/aluguel.component';
import { ConsorcioComponent } from './consorcio/consorcio.component';
import { FormularioComponent } from './financiamento/formulario/formulario.component';
import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { MainComponent } from './main/main.component';
import { ExtratoFinanciamentoComponent } from './financiamento/extrato-financiamento/extrato-financiamento.component';
import { ResultadoFinanciamentoComponent } from './financiamento/resultado-financiamento/resultado-financiamento.component';
import { GraficoFinanciamentoComponent } from './financiamento/grafico-financiamento/grafico-financiamento.component';
import { FinanciamentoPropriedadesComponent } from './financiamento/financiamento-propriedades/financiamento-propriedades.component';
import { Routes } from './models/routes';
import { ExtratoFgtsComponent } from './financiamento/extrato-fgts/extrato-fgts.component';
import { FgtsPropriedadesComponent } from './financiamento/fgts-propriedades/fgts-propriedades.component';
import { FinanciamentoSaveComponent } from './financiamento/financiamento-save/financiamento-save.component';
import { FormularioAluguelComponent } from './aluguel/formulario-aluguel/formulario-aluguel.component';
import { ExtratoAluguelComponent } from './aluguel/extrato-aluguel/extrato-aluguel.component';
import { GraficoAluguelComponent } from './aluguel/grafico-aluguel/grafico-aluguel.component';
import { ResultadoParcialComponent } from './financiamento/resultado-parcial/resultado-parcial.component';
import { MyDatePickerModule } from 'mydatepicker';
import { GlobalConfigurationComponent } from './global-configuration/global-configuration.component';
import { AluguelResultadoComponent } from './aluguel/aluguel-resultado/aluguel-resultado.component';
import { GenericTableModule } from '@angular-generic-table/core';
import { TextMaskModule } from 'angular2-text-mask';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './services/auth-service';
import { ConfigurationSelectedService } from './services/configuration-selected.service';
import { ConfigurationService } from './services/configuration-service';
import { FinanciamentoService } from './services/financiamento-services';

export const firebaseConfig = {
    apiKey: "AIzaSyAw3u-PIldtyxFVOFrReZyIT2vpfSjpNXk",
    authDomain: "meu-tcc.firebaseapp.com",
    databaseURL: "https://meu-tcc.firebaseio.com",
    projectId: "meu-tcc",
    storageBucket: "meu-tcc.appspot.com",
    messagingSenderId: "177611840966"
};

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    MenuSuperiorComponent,
    MainComponent,
    HomeComponent,
    FinanciamentoComponent,
    AluguelComponent,
    ConsorcioComponent,
    ExtratoFinanciamentoComponent,
    ResultadoFinanciamentoComponent,
    GraficoFinanciamentoComponent,
    FinanciamentoPropriedadesComponent,
    ExtratoFgtsComponent,
    FgtsPropriedadesComponent,
    FinanciamentoSaveComponent,
    FormularioAluguelComponent,
    ExtratoAluguelComponent,
    GraficoAluguelComponent,
    GlobalConfigurationComponent,
    AluguelResultadoComponent,
    ResultadoParcialComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
    MyDatePickerModule,
    GenericTableModule,
    TextMaskModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    ConfigurationSelectedService,
    ConfigurationService,
    FinanciamentoService,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
