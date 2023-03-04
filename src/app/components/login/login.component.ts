import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService} from '../../services/login.service';
import { Form } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private nombreUsuario: string = "";
  usuario = {id: 0, userName:"", password:"", isOwner: false};

  datos = {id: 0, nombre:"", apellido:"", domicilio:"", telefono:"",
    email:"", fechaNac:"", sobreMi:"", urlFoto:"", 
    urlBanner:"", idUsuarioFK: 0};

  tipoUsuario: string = "Invitado";
  editarDatos: boolean = false;
  loginerror: string = "";
  eForm = Form; // var de uso en Template/ngIf
  verForm: Form = Form.CUENTA;


  constructor(private route: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService) { 
      }

  ngOnInit(): void {

    this.editarDatos = false;
    this.loginerror = "";

    if(this.loginService.getUserLogged()){ 
      this.usuario = this.loginService.usuario;
      this.nombreUsuario = this.usuario.userName;
      if(this.usuario.isOwner)
        this.getDatosPersonales(this.loginService.idDatosPersonales);
      else
        this.getDatosPersonales(this.loginService.idDatosPersonalesInv);
  
    }else{
      this.usuario = {id: 0, userName:"", password:"", isOwner: false};
      this.nombreUsuario = "";
      this.emptyDatosPersonales();
    }
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      this.verForm = this.tipoForm(parametros.get("eForm")!);
      if(this.loginService.getUserLogged()){
        if(this.verForm == this.eForm.MODIFICA){
          this.modificarDatos();
        }
      }else{
        if(this.verForm == Form.MODIFICA 
          || this.verForm == Form.BAJA){
          alert('Debe Iniciar Sesión de Usuario.');
          this.verForm = this.eForm.INICIO;
        }
      }
    });
  }

  iniciarSesion() {
    this.loginService.modoEdicion = false;

    if(this.validarUsuario(this.usuario.userName.trim())
      && this.validarContraseña(this.usuario.password.trim())){

      this.loginService.login(this.usuario).subscribe(
        {
          next: data => {
            //Si encuentra el usuario en la DB habilita el Inicio de Sesión
            if (data != null) {
              this.nombreUsuario = data.userName;

              this.usuario = data;
              this.loginService.usuario = this.usuario; //user;
              this.loginerror = "";
              this.loginService.setToken(data.id);
              if(data.isOwner){
                this.loginService.modoEdicion = true;
                this.tipoUsuario = "Propietario";
              }

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
              //Habilito el Form. para administrar la cuenta
              this.verForm = Form.CUENTA;
              //this.route.navigate(['']);
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
    }else{
      //alert("Faltan datos.");
    }

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

    if(pw.length >= 4 && pw.length <=10
      && pattern.test(pw)){
      return true;
    }
    alert("La contraseña debe contener entre 4 y 10 caracteres \nSolo se aceptan letras y números")
    return false;
  }

  ocultarFormInicioSesion(){
    this.verForm = Form.MODIFICA;
  }

  guardarDatos(){
    if( !this.editarDatos){
      if(this.validarUsuario(this.usuario.userName.trim()) && 
        this.validarContraseña(this.usuario.password.trim()) &&
        this.datos.nombre.trim().length >= 2 && 
        this.datos.apellido.trim().length >= 2){

        this.loginService.login(this.usuario).subscribe( data => {

          if (data != null){
            if( this.usuario.userName != this.nombreUsuario){
              alert("Ya existe el usuario: \n"+this.usuario.userName);
              this.usuario.userName = this.nombreUsuario;
            }
          }else{
            this.loginService.nuevoUsuario(this.usuario).subscribe( data => {
              if (data != null) {
                this.usuario.id = data;
                this.datos.idUsuarioFK = data;
                
                this.loginService.nuevosDatosPersonales(this.datos).subscribe( data => {
                  
                  if (data != null) {
                    alert("Respuesta de api: "+ data);
      
                    console.log("Datos usuario: \n"+ JSON.stringify(this.usuario)
                      +"\nDatos personales: \n"+ JSON.stringify(this.datos)
                      +"\nDatos personales (response data): "+ data);
      
                    }else{
                      this.loginerror = "Error!! datos personales nulos";
                      console.log("login datos personales error: "+ this.loginerror);
                    }
                  }/*,(error) => {
                    console.log("error: "+ error.message);
                              
                }*/);
              }else{
                this.loginerror = "Error!! datos usuario nulos";
                console.log("login usuario error: "+ this.loginerror);
              }
            });
          }
        })
        this.verForm = Form.INICIO;
      }else{
        alert("Faltan datos.");
      }
    }else{//Se guardan modificaciones de Datos Personales
      if(this.validarUsuario(this.usuario.userName.trim()) && 
        this.validarContraseña(this.usuario.password.trim())){

        this.loginService.login(this.usuario).subscribe( data => {
          if (data != null){
            if( this.usuario.userName != this.nombreUsuario){
              alert("Ya existe el usuario: \n"+this.usuario.userName);
              this.usuario.userName = this.nombreUsuario;
            }
          }else{
            this.loginService.editUsuario(this.usuario)
            .subscribe( data => {
              if(data == null){
                alert("Error: No se han obtenido los Datos de Usuario.");
              }
            });
          }
        });
      }else{
        return;
      }
      if(this.datos.nombre.trim().length >= 2 && 
        this.datos.apellido.trim().length >= 2){

        this.loginService.editDatosPersonales(this.datos)
        .subscribe( data => {
          if(data != null){
            alert("Modificación de Datos Guardada.");
            this.editarDatos = false;
            this.route.navigate(['']);
          }else{
            alert("Error: No se han obtenido los Datos Personales.");
          }
        });
      }
    }
  }

  irAHome(){ // Opción de NO inscribirse -regresa a la vista inicial
    this.route.navigate(['']);
  }
  modificarDatos(){
    this.verForm = Form.MODIFICA;
    this.editarDatos = true;
    if(this.usuario.isOwner)
      this.getDatosPersonales(this.loginService.idDatosPersonales);
    else
      this.getDatosPersonales(this.loginService.idDatosPersonalesInv);

  }
  getDatosPersonales(idDatosPersonales: number): void{
    this.loginService.getDatosPersonales(idDatosPersonales)
      .subscribe( data => {
      if(data != null){ //verifico no null para acceder a la propiedad
        this.datos = data;
      }else{
        alert("Error: No se han obtenido los Datos.");
        this.route.navigate([''])
      }
    });
  }
  emptyDatosPersonales(){
    this.datos = {id: 0, nombre:"", apellido:"", domicilio:"", 
        telefono:"", email:"", fechaNac:"", sobreMi:"", 
        urlFoto:"", urlBanner:"", idUsuarioFK: 0};
  }
  bajaUsuario(){
    this.verForm = Form.BAJA;
  }
  /*Se da de BAJA el Usuario pero NO sus datos personales 
    que quedan en el historial de las personas que visitaron 
    el portfolio*/
  darBajaUsuario(){
    this.loginService.borrarUsuario(this.usuario.id)
      .subscribe( data => {
      if(data != null){
        this.loginService.deleteToken();
        this.usuario = {id: 0, userName:"", password:"", isOwner: false};
        this.loginService.usuario = this.usuario;
        if(this.usuario.isOwner)
          this.loginService.idDatosPersonales = 0;
        else
          this.loginService.idDatosPersonalesInv = 0;
        alert("Mensaje de api Usuario: "+data);
      }else{
        alert("Error: No se han obtenido los Datos.");
      }
      this.route.navigate(['']);
    });
  }
  //resuelve la conversion de tipos enum/string por parámetros de manera casera
  tipoForm(tipo: string) : Form {
    switch(tipo) {
      case 'Form.INICIO':
        return Form.INICIO;
      case 'Form.CUENTA':
        return Form.CUENTA;
      case 'Form.AGREGA':
        return Form.AGREGA;
      case 'Form.MODIFICA':
        return Form.MODIFICA;
      case 'Form.BAJA':
        return Form.BAJA;
    }
    return Form.INICIO;
  }
}
