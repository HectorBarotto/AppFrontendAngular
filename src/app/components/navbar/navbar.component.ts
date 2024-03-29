import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';


import { LoginService} from '../../services/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css','../../../assets/social-bar/font.css']
})
export class NavbarComponent implements OnInit {

  constructor(public loginService: LoginService, 
    private router:Router) {
  }

  ngOnInit(): void {
    this.loginService.deleteToken(); // No se toma en cuenta la memoria cache
    this.loginService.verPortfolio = false;
    //Para acortar tiempo de espera acceso a render(backend)
    this.loginService.getDatosPersonales(1)
      .subscribe( data => {
      if(data != null){ //verifico no null para acceder a la propiedad
        this.loginService.datosPersonales = data;
        this.loginService.backendConn = true;
        console.log('Acceso a backend establecido.');
        this.router.navigate(['']);
      }else{
        console.log("Error: No se han obtenido datos en navbar-OnInit.");
      }
    });
  }

  login(): void {
    this.loginService.verPortfolio = false;
    if(this.loginService.getUserLogged())
      this.cerrarSesion();
    else
      this.router.navigate(['/login/Form.INICIO']);
  }

  modificarDatos(){
    this.router.navigate(['/login/Form.MODIFICA']);
  }
  bajaUsuario(){
    this.router.navigate(['/login/Form.BAJA']);
  }
  cerrarSesion(){
    if(this.loginService.getUserLogged()){
      if(this.loginService.modoEdicion)
        this.loginService.modoEdicion = false;
      alert(this.loginService.usuario.userName +": Ha cerrado sesión");
      this.loginService.usuario = null;
      this.loginService.deleteToken();
      this.router.navigate(['']);
    }
  }
/*
  showElement(mostrar : boolean): void{
    /* invierte el valor boolean cada vez que hace click en login btn
    this.loginService.mostrarIconos? this.loginService.mostrarIconos=false:
    this.loginService.mostrarIconos=true;
    */
/*    this.loginService.modoEdicion = mostrar;
  }
*/
}
