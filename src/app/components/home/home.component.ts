import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService} from '../../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']})

export class HomeComponent implements OnInit {

  stylePerfil = "style-img-perfil-in-home";
  urlBanner!: string;

  usuario = {id: 0, userName:"", password:"", isOwner: false};

  datos = {id: 0, nombre:"", apellido:"", domicilio:"", telefono:"",
    email:"", fechaNac:"", sobreMi:"", urlFoto:"", 
    urlBanner:"", idUsuarioFK: 0};

  tipoUsuario: string = "Invitado";
  editarDatos: boolean = false;
  loginerror: string = "";
  contactoIr: boolean = false; //Ir al Form. para enviar datos de contacto

  constructor(private route: Router,
    public loginService : LoginService) { 
  }


  ngOnInit(): void {
    this.urlBanner = this.loginService.datosPersonales.urlBanner;
    this.contactoIr = false;
  }

  editarUrlBanner(){
    this.route.navigate(['edicion/Form.MODIFICA/Seccion.BANNER']);
  }

  datosContacto(): void{
    this.loginService.verPortfolio = false;
    this.contactoIr = true;
    this.verPorfolio();
  }

  verPorfolio() {
    if (!this.loginService.backendConn &&
      !confirm("El primer ingreso de\n"
      +"acceso a datos puede demorar hasta 4 min ....\n"
      +"Espera hasta 4 minutos ?")) {
        this.route.navigate(['']);
        return;
    }
    this.usuario.id = 1;
    this.usuario.userName = "hmb.barotto";
    this.usuario.password = "mp0260";
    this.datos.id = 1;
    this.datos.idUsuarioFK = 1;
    this.loginService.modoEdicion = false;

    this.loginService.login(this.usuario).subscribe(
      {
        next: data => {
          //Si encuentra el usuario en la DB habilita el Inicio de Sesión
          if (data != null) {
            this.usuario = data;
            this.loginService.usuario = this.usuario; //user;
            this.loginerror = "";
            this.loginService.setToken(data.id);
            this.loginService.verPortfolio = true;

            console.log("Usuario con acceso: "+ this.usuario.userName);
            //Guardo en loginService el ID de DatosPersonales para relacionarlo con otros componentes
            this.loginService.listaDatosPersonales().subscribe( data => {
              if(data != null){ //verifico no null para acceder a la propiedad
                if(data.length > 0){
                  //En todos los casos el id y los datos personales son propios para el portfolio
                  this.loginService.datosPersonales = data[0];
                  this.loginService.idDatosPersonales = data[0].id;
                  //Se recorre una lista para obtener datos personales del usuario invitado a ver el portfolio
                  for(let i = 0; i < data.length; i++){
                    if(this.usuario.id == data[i].idUsuarioFK){
                      this.datos.nombre = data[i].nombre;
                      if(!data[i].isOwner){
                        this.loginService.datosPersonalesInv = data[i];
                        this.loginService.idDatosPersonalesInv = data[i].id;
                      }
                      i = data.length-1;
                    }
                  }
                }
              }
            });
            if(this.contactoIr){
              this.contactoIr = false;
              this.route.navigate(['/contacto-datos']);
            }else
              this.route.navigate(['']);
          }else{
            alert("Usuario no encontrado.\nInscribirse para iniciar sesión.");
            this.usuario = {id: 0, userName:"", password:"", isOwner: false};
            this.loginerror = "Error!! datos nulos";
            console.log("error: "+this.loginerror);
          }
        }, 
        error: err  => {
          if(err.status === 504)
            alert("Error 504: El servicio api rest no responde");
        },
        complete: () => console.log('Observer: Operación terminada.')
      }
    );

  }
}
