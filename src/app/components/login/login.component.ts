import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService} from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route:Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  iniciarSesion(usuario:string, pw:string): boolean {
    this.loginService.modoEdicion = false;
    if(this.validarUsuario(usuario.trim())
      && this.validarContraseña(pw.trim())){
      this.loginService.modoEdicion = true;
      this.route.navigate(['']);
    }
    return this.loginService.modoEdicion;
  }
  validarUsuario(usuario:string):boolean{
    // El pattern que vamos a comprobar
    const pattern = new RegExp(/^[A-Za-z0-9\s\@\.\-]+$/g);

    if(usuario.trim().length >= 5 && usuario.trim().length <=50
      && pattern.test(usuario.trim())){
      return true;
    }
    alert("El nombre de usuario debe contener entre 5 y 50 caracteres")
    return false;
  }
  validarContraseña(pw:string):boolean{
    // El pattern que vamos a comprobar
    const pattern = new RegExp(/^[A-Za-z0-9]+$/g);

    if(pw.length >= 5 && pw.length <=10
      && pattern.test(pw)){
      return true;
    }
    alert("La contraseña debe contener entre 5 y 10 caracteres \nSolo se aceptan letras y números")
    return false;
  }
}
