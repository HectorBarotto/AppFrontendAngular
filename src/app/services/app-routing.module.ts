import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//import { AppComponent } from '../app.component';
//import { NavbarComponent } from '../navbar/navbar.component';
import { AcercaDeComponent } from '../components/acerca-de/acerca-de.component';
import { ExperienciaComponent } from '../components/experiencia/experiencia.component';
import { EducacionComponent } from '../components/educacion/educacion.component';
import { HabilidadesComponent } from '../components/habilidades/habilidades.component';
import { ProyectosComponent } from '../components/proyectos/proyectos.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';

const routes: Routes = [{path: '', component: HomeComponent},
{path: 'acerca-de', component: AcercaDeComponent},
{path: 'experiencia', component: ExperienciaComponent},
{path: 'educacion', component: EducacionComponent},
{path: 'habilidades', component: HabilidadesComponent},
{path: 'proyectos', component: ProyectosComponent},
{path: 'login/:eForm', component: LoginComponent},
{path: '**', component: PageNotFoundComponent}];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
