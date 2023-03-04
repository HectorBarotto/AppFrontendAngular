import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

//import [ CommonModule ] from '@angular/common';
//import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './services/app-routing.module';
//import { LayoutModule } from './layout/layout.module';
//import {PagesModule} from './pages.module';
import { HttpClientModule } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { HabilidadesComponent } from './components/habilidades/habilidades.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EdicionComponent } from './components/edicion/edicion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    HabilidadesComponent,
    ProyectosComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    EdicionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
    /*
    RouterModule.forRoot([{path: '', component: HomeComponent},
    {path: 'acerca-de', component: AcercaDeComponent},
    {path: 'experiencia', component: ExperienciaComponent},
    {path: 'educacion', component: EducacionComponent},
    {path: 'habilidades', component: HabilidadesComponent},
    {path: 'proyectos', component: ProyectosComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', component: PageNotFoundComponent} ])
    */
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
