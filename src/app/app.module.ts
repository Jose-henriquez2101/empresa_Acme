import { NgModule, LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { ProductListComponent } from './product/product-list/product-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StarComponent } from './product/product-list/star/star.component';
import { SumasComponent } from './products/sumas/sumas.component';
import { registerLocaleData } from '@angular/common';
import localeEsCl from '@angular/common/locales/es-CL';
import { DefaultPipe } from './shared/image.pipe';
import { HttpClientModule } from '@angular/common/http';



registerLocaleData(localeEsCl, 'es-CL');


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    StarComponent,
    SumasComponent,
    DefaultPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es-CL'}],
  bootstrap: [AppComponent]
})
export class AppModule { }