import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _modoEdicion = false;

  constructor() {}

  public get modoEdicion():boolean{
    return this._modoEdicion;
  }
  public set modoEdicion(value:boolean){
    this._modoEdicion = value;
  }
}
