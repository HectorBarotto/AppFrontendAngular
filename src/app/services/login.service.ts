import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export enum Form{'INICIO', 'CUENTA', 'MODIFICA', 'BAJA'};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "/api/";
  private _modoEdicion = false;
  private _usuario = {id: 0, userName:"", password:"", isOwner:false};
  private _idDatosPersonales = 0;
  private _datosPersonales = {id: 0, nombre:"", apellido:"", domicilio:"", telefono:"",
  email:"", fechaNac:"", sobreMi:"", urlFoto:"", 
  urlBanner:"", idUsuarioFK: 0};

  constructor(private http: HttpClient , 
    private cookies: CookieService) {}

/*
handleErrors(error: HttpErrorResponse): Observable<never>  {
  if (error.status == HttpStatusCode.Forbidden)
    return throwError(() => new Error('No tiene permisos para realizar la solicitud.'));
  if (error.status == HttpStatusCode.NotFound)
    return throwError(() => new Error('El usuario no existe.'));
  if (error.status == HttpStatusCode.InternalServerError)
    return throwError(() => new Error('Error en el servidor.'));  
  return throwError(() => new Error('Un error inesperado ha ocurrido.'));
}
*/
login(user: any): Observable<any> {
  return this.http.post(this.url+"usuario/login", user);
}
  /*
  login(user: any): Observable<any> {
    return this.http.post(this.url+"usuario/login", user).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.handleErrors(err);
      })
    );
  }
  */
  getUser(id:number): Observable<any> {
    return this.http.get(this.url+"usuario/traer/"+ id);
  }
  getUserLogged(): boolean{
    return this.getToken().trim().length > 0;
  }
  nuevoUsuario(user: any): Observable<any> {
    return this.http.post(this.url+"usuario/agregar",user,
    {responseType: 'text'});
  }
  editUsuario(datos: any): Observable<any> {
    return this.http.put(this.url+"usuario/editar/",datos);
  }
  borrarUsuario(id:number): Observable<any> {
    return this.http.delete(this.url+"usuario/borrar/"+ id,
    {responseType: 'text'});
  }
  getDatosPersonales(id:number): Observable<any> {
    return this.http.get(this.url+"datospersonales/traer/"+ id);
  }
  nuevosDatosPersonales(datos: any): Observable<any> {
    return this.http.post(this.url+"datospersonales/agregar",datos,
    {responseType: 'text'});
  }
  listaDatosPersonales(): Observable<any> {
    return this.http.get(this.url+"datospersonales/traer");
  }
  editDatosPersonales(datos: any): Observable<any> {
    return this.http.put(this.url+"datospersonales/editar/",datos);
  }

  setToken(token: string){
    this.cookies.set("token", token);
  }
  getToken(){
    return this.cookies.get("token");
  }
  deleteToken(){
    this.cookies.delete("token");
  }

  public get usuario(): any{
    return this._usuario;
  }
  public set usuario(user : any){
    this._usuario = user;
  }

  public get datosPersonales(): any{
    return this._datosPersonales;
  }
  public set datosPersonales(datos : any){
    this._datosPersonales = datos;
  }

  public get idDatosPersonales(){
    return this._idDatosPersonales;
  }
  public set idDatosPersonales(id){
    this._idDatosPersonales = id;
  }

  public get modoEdicion():boolean{
    return this._modoEdicion;
  }
  public set modoEdicion(value:boolean){
    this._modoEdicion = value;
  }

}
