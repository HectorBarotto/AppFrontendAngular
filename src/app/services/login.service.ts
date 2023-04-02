import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export enum Form{'INICIO', 'CUENTA', 'AGREGA', 'MODIFICA', 'BAJA'};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "https://portfolio-sb.onrender.com/api/";
  private _modoEdicion = false;
  private _usuario = {id: 0, userName:"", password:"", isOwner:false};
  //Datos personales del propietario
  private _idDatosPersonales = 0;
  private _datosPersonales = {id: 0, nombre:"", apellido:"", domicilio:"", telefono:"",
  email:"", fechaNac:"", sobreMi:"", urlFoto:"", 
  urlBanner:"", idUsuarioFK: 0};
  //Datos personales del invitado al portfolio (quedan registrados)
  private _idDatosPersonalesInv = 0;
  private _datosPersonalesInv = {id: 0, nombre:"", apellido:"", domicilio:"", telefono:"",
  email:"", fechaNac:"", sobreMi:"", urlFoto:"", 
  urlBanner:"", idUsuarioFK: 0};
  
  private _urlFoto_bak!: string;
  private _urlBanner_bak!: string;

  private _backendConn : boolean = false;
  private _verPortfolio: boolean = false;

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
    return this.http.post(this.url+"usuario/agregar/",user,
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
    return this.http.post(this.url+"datospersonales/agregar/",datos,
    {responseType: 'text'});
  }
  listaDatosPersonales(): Observable<any> {
    return this.http.get(this.url+"datospersonales/traer");
  }
  editDatosPersonales(datos: any): Observable<any> {
    return this.http.put(this.url+"datospersonales/editar/",datos);
  }
  borrarDatosPersonales(id:number): Observable<any> {
    return this.http.delete(this.url+"datospersonales/borrar/"+ id,
    {responseType: 'text'});
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
//Datos personales del propietario
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
//Datos personales del invitado
public get datosPersonalesInv(): any{
  return this._datosPersonalesInv;
}
public set datosPersonalesInv(datos : any){
  this._datosPersonalesInv = datos;
}

public get idDatosPersonalesInv(){
  return this._idDatosPersonalesInv;
}
public set idDatosPersonalesInv(id){
  this._idDatosPersonalesInv = id;
}  
//guarda el último dato validado para restaurar ante un error 404 not found
  public get urlFoto_bak(){
    return this._urlFoto_bak;
  }
  public set urlFoto_bak(urlFoto: string){
    this._urlFoto_bak = urlFoto;
  }

  public get urlBanner_bak(){
    return this._urlBanner_bak;
  }
  public set urlBanner_bak(urlBanner: string){
    this._urlBanner_bak = urlBanner;
  }

  public get modoEdicion():boolean{
    return this._modoEdicion;
  }
  public set modoEdicion(value:boolean){
    this._modoEdicion = value;
  }

  //Control de conexión a backend online (render - clever cloud)
  public get backendConn():boolean{
    return this._backendConn;
  }
  public set backendConn(value:boolean){
    this._backendConn = value;
  }
  //Control de ingreso a portfolio sin login
  public get verPortfolio():boolean{
    return this._verPortfolio;
  }
  public set verPortfolio(value:boolean){
    this._verPortfolio = value;
  }
}
