import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//Identifica una sección en el portfolio
export enum Seccion{'BANNER', 'PERFIL', 'ACERCA_DE', 
  'EXP_LABORAL', 'EDUCACION', 'HABILIDADES', 'PROYECTOS'};

@Injectable({
  providedIn: 'root'
})
export class EdicionService {
  private url = "/api/";

  constructor(private http: HttpClient) { }

  //EXPERIENCIA LABORAL
  getListaExperiencias(): Observable<any> {
    return this.http.get(this.url+"experiencialaboral/traer");
  }
  getExpLaboral(id:number): Observable<any> {
    return this.http.get(this.url+"experiencialaboral/traer/"+ id);
  }
  addExpLaboral(expLaboral: any): Observable<any> {
    return this.http.post(this.url+"experiencialaboral/agregar",
      expLaboral, {responseType: 'text'});
  }
  editExpLaboral(expLaboral: any): Observable<any> {
    return this.http.put(this.url+"experiencialaboral/editar",expLaboral);
  }
  delExpLaboral(id:number): Observable<any> {
    return this.http.delete(this.url+"experiencialaboral/borrar/"+ id,
      {responseType: 'text'});
  }
//EDUCACION
getListaEducacion(): Observable<any> {
  return this.http.get(this.url+"educacion/traer");
}
getEducacion(id:number): Observable<any> {
  return this.http.get(this.url+"educacion/traer/"+ id);
}
addEducacion(educacion: any): Observable<any> {
  return this.http.post(this.url+"educacion/agregar",
    educacion, {responseType: 'text'});
}
editEducacion(educacion: any): Observable<any> {
  return this.http.put(this.url+"educacion/editar",educacion);
}
delEducacion(id:number): Observable<any> {
  return this.http.delete(this.url+"educacion/borrar/"+ id,
    {responseType: 'text'});
}
//HABILIDADES
getListaHabilidades(): Observable<any> {
  return this.http.get(this.url+"habilidades/traer");
}
getHabilidad(id:number): Observable<any> {
  return this.http.get(this.url+"habilidades/traer/"+ id);
}
addHabilidad(habilidad: any): Observable<any> {
  return this.http.post(this.url+"habilidades/agregar",
    habilidad, {responseType: 'text'});
}
editHabilidad(habilidad: any): Observable<any> {
  return this.http.put(this.url+"habilidades/editar",habilidad);
}
delHabilidad(id:number): Observable<any> {
  return this.http.delete(this.url+"habilidades/borrar/"+ id,
    {responseType: 'text'});
}
//PROYECTOS
getListaProyectos(): Observable<any> {
  return this.http.get(this.url+"proyecto/traer");
}
getProyecto(id:number): Observable<any> {
  return this.http.get(this.url+"proyecto/traer/"+ id);
}
addProyecto(proyecto: any): Observable<any> {
  return this.http.post(this.url+"proyecto/agregar",
  proyecto, {responseType: 'text'});
}
editProyecto(proyecto: any): Observable<any> {
  return this.http.put(this.url+"proyecto/editar",proyecto);
}
delProyecto(id:number): Observable<any> {
  return this.http.delete(this.url+"proyecto/borrar/"+ id,
    {responseType: 'text'});
}
}
