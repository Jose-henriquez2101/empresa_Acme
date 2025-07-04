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
import { ModalAddComponent } from './services/modal-add/modal-add.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';



registerLocaleData(localeEsCl, 'es-CL');


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    StarComponent,
    SumasComponent,
    DefaultPipe,
    ModalAddComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'product/product-list', component: ProductListComponent, canActivate: [LoginGuard]},
      {path: 'welcome', component: WelcomeComponent, canActivate: [LoginGuard]},
      {path: 'login', component: LoginComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent},
      
    ])
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es-CL'}, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }