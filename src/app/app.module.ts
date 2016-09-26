import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FormularioComponent } from './app.formulario/app.formulario.component';
import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    MenuSuperiorComponent
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
