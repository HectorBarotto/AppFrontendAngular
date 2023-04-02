import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-contacto-datos',
  templateUrl: './contacto-datos.component.html',
  styleUrls: ['./contacto-datos.component.css']
})
export class ContactoDatosComponent implements OnInit {

  public datosGuardados: boolean = false;
  public verBtnVolver: boolean = false;

 // usuario = {id: 0, userName:"", password:"", isOwner: false};

  datos = {id: 0, nombre:"", apellido:"", domicilio:"", telefono:"",
    email:"", fechaNac:"", sobreMi:"", urlFoto:"", 
    urlBanner:"", idUsuarioFK: 0};

  listaDatos = [this.datos];  

  constructor(private route: Router,
    private activatedRoute: ActivatedRoute,
    public loginService : LoginService) { }

  ngOnInit(): void {
    this.verBtnVolver = false;
    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => 
    {
      if(parametros.get('verSeccion') == '1')
        this.verBtnVolver = true;
    });


    this.loginService.listaDatosPersonales()
    .subscribe( 
      {
        next: data => {
          if(data != null){ //verifico no null para acceder a la propiedad
            this.listaDatos = data;
            this.listaDatos.shift();
          }
        },
        error: err  => {
          if(err.status === 504)
            alert("Error 504: El servicio api rest no responde");
        }
        //,complete: () => console.log('Observer: Operación terminada.')
      }
    );
  }

  guardarDatos(){
    if(this.validarUsuario(this.datos.nombre.trim()) &&
      this.datos.nombre.trim().length >= 2 ){
        // Datos de un visitante sin Login
        /*
        this.usuario.userName = "anonimo";
        this.usuario.password = "1234";
        this.usuario.isOwner = false;
        */
        this.datos.apellido = "anonimo";
/*
        this.loginService.nuevoUsuario(this.usuario).subscribe( data => {
          if (data != null) {
            this.usuario.id = data;
            */            
            this.datos.idUsuarioFK = 1;
            this.loginService.nuevosDatosPersonales(this.datos)
              .subscribe( 
                {  next: data => {
                  if (data != null) {
                    console.log("Respuesta de api: "+ data);
                  }else{
                    console.log("Error!! datos personales nulos");
                  }
                }, 
                error: err  => {
                  if(err.status === 504)
                    alert("Error 504: El servicio api rest no responde");
                },
                complete: () => {
                  console.log('Observer: Operación terminada.')
                  this.datosGuardados = true;
                }
              });
/*              
          }else{
            console.log("Error al ingresar nuevo usuario SIN LOGIN");
          }
        });
*/        
      }
  }
  validarUsuario(nombre:string):boolean{
    // El pattern que vamos a comprobar
    const pattern = new RegExp(/^[A-Za-z0-9\s\@\.\-]+$/g);

    if(nombre.trim().length >= 3 && nombre.trim().length <=50
      && pattern.test(nombre.trim())){
      return true;
    }
    alert("El nombre en datos personales debe contener entre 3 y 50 caracteres")
    return false;
  }

  eliminaDato(id: number){
    this.loginService.getDatosPersonales(id)
    .subscribe( 
      {  next: data => {
        if (data != null) {
          this.datos = data;
          console.log("Respuesta de api: "+ data);
          if (!confirm("¿seguro que desea ELIMINAR Datos de :\n"
              +this.datos.nombre+ " -id: "+ this.datos.id+" ?")) {
            alert("\'Ha cancelado la acción de ELIMINAR.\'");
            return;
          }
      
          this.loginService.borrarDatosPersonales(id)
            .subscribe( data => {
            if(data != null){
              alert("Mensaje de api Usuario: "+data);
            }else{
              alert("Error: No se han obtenido los Datos.");
            }
            this.ngOnInit();
          });
        }else{
          console.log("Error!! datos personales nulos");
          return;
        }
      }, 
      error: err  => {
        if(err.status === 504)
          alert("Error 504: El servicio api rest no responde");
      },
      complete: () => {
        console.log('Observer: Operación terminada.')
      }
    });

  }

  volver(){
    this.route.navigate(['']);
  }

  emptyDatosPersonales(){
    this.datos = {id: 0, nombre:"", apellido:"", domicilio:"", 
        telefono:"", email:"", fechaNac:"", sobreMi:"", 
        urlFoto:"", urlBanner:"", idUsuarioFK: 0};
  }
}
