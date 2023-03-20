import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService} from '../../services/login.service';
import { EdicionService } from 'src/app/services/edicion.service';
import { Form } from '../../services/login.service';
import { Seccion } from '../../services/edicion.service';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {
  urlBanner: string = "";
  urlPerfil: string = "";
  sobreMi: string = "";
  sobreMi_bak: string = "";
  seccion = Seccion; // Secciones de edición
  seccionIn!: Seccion; // Identifica una sección en el template
  eForm = Form; // var de uso en Template/ngIf
  verForm!: Form ;

  public fechaI= "";
  public fechaF= "";
  public experiencia = {id:0, nombreEmpresa:"", 
    puesto:"", isTrabajoActual: true,
    fechaInicio: null, fechaFin: null,
    descripcion:"", urlLogo:"", idDatosPersonalesFK:0}
  public educacion = {id:0, institucion:"", 
    titulo:"", descripcion:"",fechaInicio: null, 
    fechaFin: null, urlLogo:"", idDatosPersonalesFK:0}
  public habilidad = {id:0, descripcion:"", nivel:0, idDatosPersonalesFK:0}
  public proyecto = {id:0, proyecto:"", descripcion:"",
    fechaInicio: null, fechaFin: null, url:"", urlLogo:"", 
    idDatosPersonalesFK:0}

  constructor(public route: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private edicionService: EdicionService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => 
    {
      this.verForm = this.tipoForm(parametros.get("eForm")!);
      this.seccionIn = this.tipoSeccion(parametros.get("seccion")!);

      switch(this.verForm){
        case this.eForm.AGREGA:{
          switch(this.seccionIn){
            case this.seccion.EXP_LABORAL:{
              console.log('Agrega Exp.Laboral.');
              break;}
            case this.seccion.EDUCACION:{
              console.log('Agrega Educación.');
              break;}
            case this.seccion.HABILIDADES:{
              console.log('Agrega Habilidad Laboral.');
              break;
            }
            case this.seccion.PROYECTOS:{
              console.log('Agrega proyecto.');
              break;
            }
            default:{
              console.log('Error en parámetro de sección');
            }
          }
          break;}
        case this.eForm.BAJA:{
          switch(this.seccionIn){
            case this.seccion.EXP_LABORAL:{
              this.edicionService.getExpLaboral(Number(parametros.get("idElement")))
              .subscribe( 
              {  next: data => {
                if (data != null) {
                  console.log("Respuesta de api: Exp.Laboral id= "+ data.id);
                  this.experiencia = data;
                  //fecha a mostrar invertida(dd/mm/aaaa) si el dato es no null
                  if(this.experiencia.fechaInicio != null){
                    this.fechaI = this.experiencia.fechaInicio;
                    //this.fechaI = this.fechaI.split(" ")[0].split("-").reverse().join("/");
                  }else
                    this.fechaI = "";
                  if(this.experiencia.fechaFin != null){
                    this.fechaF = this.experiencia.fechaFin;
                    //this.fechaF = this.fechaF.split(" ")[0].split("-").reverse().join("/");
                  }else
                    this.fechaF = "";
                }else{
                  console.log("Error!! experiencia laboral -> datos nulos");
                }
              }, 
              error: err  => {
                if(err.status === 504)
                  alert("Error 504: El servicio api rest no responde");
              },
              complete: () => {console.log('Observer: Operación terminada.')}
              });  
              break;
            }
            case this.seccion.EDUCACION:{
              this.edicionService.getEducacion(Number(parametros.get("idElement")))
              .subscribe( 
              {  next: data => {
                if (data != null) {
                  console.log("Respuesta de api: Educacion id= "+ data.id);
                  this.educacion = data;
                  //fecha a mostrar invertida(dd/mm/aaaa) si el dato es no null
                  if(this.educacion.fechaInicio != null){
                    this.fechaI = this.educacion.fechaInicio;
                    //this.fechaI = this.fechaI.split(" ")[0].split("-").reverse().join("/");
                  }else
                    this.fechaI = "";
                  if(this.educacion.fechaFin != null){
                    this.fechaF = this.educacion.fechaFin;
                    //this.fechaF = this.fechaF.split(" ")[0].split("-").reverse().join("/");
                  }else
                    this.fechaF = "";
                }else{
                  console.log("Error!! educacion -> datos nulos");
                }
              }, 
              error: err  => {
                if(err.status === 504)
                  alert("Error 504: El servicio api rest no responde");
              },
              complete: () => {console.log('Observer: Operación terminada.')}
              });  
              break;}
            case this.seccion.HABILIDADES:{
              this.edicionService.getHabilidad(Number(parametros.get("idElement")))
              .subscribe( 
              {  next: data => {
                if (data != null) {
                  console.log("Respuesta de api: Habilidad id= "+ data.id);
                  this.habilidad = data;
                }else{
                  console.log("Error!! habilidades -> datos nulos");
                }
              }, 
              error: err  => {
                if(err.status === 504)
                  alert("Error 504: El servicio api rest no responde");
              },
              complete: () => {console.log('Observer: Operación terminada.')}
              });  
              break;
            }
            case this.seccion.PROYECTOS:{
              this.edicionService.getProyecto(Number(parametros.get("idElement")))
              .subscribe( 
              {  next: data => {
                if (data != null) {
                  console.log("Respuesta de api: Proyecto id= "+ data.id);
                  this.proyecto = data;
                  //fecha a mostrar invertida(dd/mm/aaaa) si el dato es no null
                  if(this.proyecto.fechaInicio != null){
                    this.fechaI = this.proyecto.fechaInicio;
                    //this.fechaI = this.fechaI.split(" ")[0].split("-").reverse().join("/");
                  }else
                    this.fechaI = "";
                  if(this.proyecto.fechaFin != null){
                    this.fechaF = this.proyecto.fechaFin;
                    //this.fechaF = this.fechaF.split(" ")[0].split("-").reverse().join("/");
                  }else
                    this.fechaF = "";
                }else{
                  console.log("Error!! proyecto -> datos nulos");
                }
              }, 
              error: err  => {
                if(err.status === 504)
                  alert("Error 504: El servicio api rest no responde");
              },
              complete: () => {console.log('Observer: Operación terminada.')}
              }); 
              break;
            }
            default:{
              console.log('Error en parámetro de sección');
            }
          }
          break;}
        case this.eForm.MODIFICA:{
          switch(this.seccionIn){
            case this.seccion.BANNER:{
              this.urlBanner = this.loginService.datosPersonales.urlBanner;
              this.loginService.urlBanner_bak = this.urlBanner;
              console.log('Edición de UrlBanner.');
              break;}
            case this.seccion.PERFIL:{
              this.urlPerfil = this.loginService.datosPersonales.urlFoto;
              this.loginService.urlFoto_bak = this.urlPerfil;
              console.log('Edición de UrlFoto Perfil.');
              break;}
            case this.seccion.ACERCA_DE:{
              this.sobreMi = this.loginService.datosPersonales.sobreMi;
              this.sobreMi_bak = this.sobreMi;
              console.log('Edición de Datos Personales/SobreMi');
              break;
            }
            case this.seccion.EXP_LABORAL:{
              this.edicionService.getExpLaboral(Number(parametros.get("idElement")))
              .subscribe( 
              {  next: data => {
                if (data != null) {
                  console.log("Respuesta de api: Exp.Laboral id= "+ data.id);
                  this.experiencia = data;
                }else{
                  console.log("Error!! experiencia laboral -> datos nulos");
                }
              }, 
              error: err  => {
                if(err.status === 504)
                  alert("Error 504: El servicio api rest no responde");
              },
              complete: () => {console.log('Observer: Operación terminada.')}
              });  
              break;
            }
            case this.seccion.EDUCACION:{
              this.edicionService.getEducacion(Number(parametros.get("idElement")))
              .subscribe( 
              {  next: data => {
                if (data != null) {
                  console.log("Respuesta de api: Educación id= "+ data.id);
                  this.educacion = data;
                }else{
                  console.log("Error!! educacion -> datos nulos");
                }
              }, 
              error: err  => {
                if(err.status === 504)
                  alert("Error 504: El servicio api rest no responde");
              },
              complete: () => {console.log('Observer: Operación terminada.')}
              });  
              break;}
            case this.seccion.HABILIDADES:{
              this.edicionService.getHabilidad(Number(parametros.get("idElement")))
              .subscribe( 
              {  next: data => {
                if (data != null) {
                  console.log("Respuesta de api: Habilidad id= "+ data.id);
                  this.habilidad = data;
                }else{
                  console.log("Error!! habilidad -> datos nulos");
                }
              }, 
              error: err  => {
                if(err.status === 504)
                  alert("Error 504: El servicio api rest no responde");
              },
              complete: () => {console.log('Observer: Operación terminada.')}
              });
              break;
            }
            case this.seccion.PROYECTOS:{
              this.edicionService.getProyecto(Number(parametros.get("idElement")))
              .subscribe( 
              {  next: data => {
                if (data != null) {
                  console.log("Respuesta de api: Proyecto id= "+ data.id);
                  this.proyecto = data;
                }else{
                  console.log("Error!! proyecto -> datos nulos");
                }
              }, 
              error: err  => {
                if(err.status === 504)
                  alert("Error 504: El servicio api rest no responde");
              },
              complete: () => {console.log('Observer: Operación terminada.')}
              });
              break;
            }
            default:{
              console.log('Error en parámetro de sección');
            }
          }
          break;}
        default:{
          console.log('Error en parámetro de formulario');
        }
      }        
    });

  }
//AGREGA DATOS
agregar(){
  switch(this.seccionIn){
    case this.seccion.EXP_LABORAL:{
      if(this.experiencia.nombreEmpresa.trim().length >= 5){
        this.agregaExperiencia();
      }else
        console.log('Error en agregar: Nombre Empresa vacío.');
      break;
    }
    case this.seccion.EDUCACION:{
      if(this.educacion.institucion.trim().length >= 5){
        this.agregaEducacion();
      }else
        console.log('Error en agregar: Nombre Institución vacío.');
      break;
    }
    case this.seccion.HABILIDADES:{
      if(this.habilidad.descripcion.trim().length >= 5){
        this.agregaHabilidad();
      }else
        console.log('Error en agregar: Descripción en habilidad vacío.');
      break;
    }
    case this.seccion.PROYECTOS:{
      if(this.proyecto.proyecto.trim().length >= 5){
        this.agregaProyecto();
      }else
        console.log('Error en agregar: Proyecto, nombre vacío.');
      break;
    }
    default:{
      console.log('Error en parámetro de sección');
    }
  }
}
  //AGREGA EN SECCION: EXPERIENCIA LABORAL
  agregaExperiencia(){
    if(this.loginService.datosPersonales.id > 0){
      this.experiencia.idDatosPersonalesFK = this.loginService.datosPersonales.id;
    }else
      return;
    if(this.experiencia.isTrabajoActual)
      this.experiencia.fechaFin = null;

    this.edicionService.addExpLaboral(this.experiencia)
    .subscribe( 
    {  next: data => {
      if (data != null) {
        console.log("Respuesta de api: "+ data);
      }else{
        console.log("Error!! experiencia laboral -> datos nulos");
      }
    }, 
    error: err  => {
      if(err.status === 504)
        alert("Error 504: El servicio api rest no responde");
    },
    complete: () => {console.log('Observer: Operación terminada.')
        this.route.navigate(['']);}
    });  
  }
  //AGREGA EN SECCION: EDUCACIÓN
  agregaEducacion(){
    if(this.loginService.datosPersonales.id > 0){
      this.educacion.idDatosPersonalesFK = this.loginService.datosPersonales.id;
    }else
      return;

    this.edicionService.addEducacion(this.educacion)
    .subscribe( 
    {  next: data => {
      if (data != null) {
        console.log("Respuesta de api: "+ data);
      }else{
        console.log("Error!! educacion -> datos nulos");
      }
    }, 
    error: err  => {
      if(err.status === 504)
        alert("Error 504: El servicio api rest no responde");
    },
    complete: () => {console.log('Observer: Operación terminada.')
        this.route.navigate(['']);}
    });  

  }
  //AGREGA EN SECCION: HABILIDADES
  agregaHabilidad(){
    if(this.loginService.datosPersonales.id > 0){
      this.habilidad.idDatosPersonalesFK = this.loginService.datosPersonales.id;
    }else
      return;

    this.edicionService.addHabilidad(this.habilidad)
    .subscribe( 
    {  next: data => {
      if (data != null) {
        console.log("Respuesta de api: "+ data);
      }else{
        console.log("Error!! habilidad -> datos nulos");
      }
    }, 
    error: err  => {
      if(err.status === 504)
        alert("Error 504: El servicio api rest no responde");
    },
    complete: () => {console.log('Observer: Operación terminada.')
        this.route.navigate(['']);}
    });  

  }
  //AGREGA EN SECCION: PROYECTOS
  agregaProyecto(){
    if(this.loginService.datosPersonales.id > 0){
      this.proyecto.idDatosPersonalesFK = this.loginService.datosPersonales.id;
    }else
      return;

    this.edicionService.addProyecto(this.proyecto)
    .subscribe( 
    {  next: data => {
      if (data != null) {
        console.log("Respuesta de api: "+ data);
      }else{
        console.log("Error!! proyecto -> datos nulos");
      }
    }, 
    error: err  => {
      if(err.status === 504)
        alert("Error 504: El servicio api rest no responde");
    },
    complete: () => {console.log('Observer: Operación terminada.')
        this.route.navigate(['']);}
    });  

  }

//FIN AGREGA DATOS
//BAJAS
eliminar(){
  switch(this.seccionIn){
    case this.seccion.EXP_LABORAL:{
      if(this.experiencia.id > 0){
        this.eliminaExpLaboral();
      }else
        console.log('Error en eliminar: id Exp.Laboral < 1.');
      break;
    }
    case this.seccion.EDUCACION:{
      if(this.educacion.id > 0){
        this.eliminaEducacion();
      }else
        console.log('Error en eliminar: id Item Educación < 1.');
      break;
    }
    case this.seccion.HABILIDADES:{
      if(this.habilidad.id > 0){
        this.eliminaHabilidad();
      }else
        console.log('Error en eliminar: id Item Habilidades < 1.');
      break;
    }
    case this.seccion.PROYECTOS:{
      if(this.proyecto.id > 0){
        this.eliminaProyecto();
      }else
        console.log('Error en eliminar: id Item Proyectos < 1.');

      break;
    }
    default:{
      console.log('Error en parámetro de sección');
    }
  }
}
  //BAJA EN EXPERIENCIA LABORAL
  eliminaExpLaboral(){
    if (!confirm("¿seguro que desea ELIMINAR su Experiencia Laboral en:\n"
      +this.experiencia.nombreEmpresa+" ?")) {
        alert("\'Ha cancelado la acción de ELIMINAR.\'");
        this.route.navigate(['']);
        return;
    }

    this.edicionService.delExpLaboral(this.experiencia.id)
    .subscribe( 
    {  next: data => {
      if (data != null) {
        console.log("Respuesta de api: "+ data);
      }else{
        console.log("Error!! experiencia laboral -> datos nulos");
      }
    }, 
    error: err  => {
      if(err.status === 504)
        alert("Error 504: El servicio api rest no responde");
    },
    complete: () => {console.log('Observer: Operación terminada.')
        this.route.navigate(['']);}
    });  

  }

  //BAJA EN EDUCACION
  eliminaEducacion(){
    if (!confirm("¿seguro que desea ELIMINAR su Estudio en:\n"
      +this.educacion.institucion+ " ?")) {
        alert("\'Ha cancelado la acción de ELIMINAR.\'");
        this.route.navigate(['']);
        return;
    }

    this.edicionService.delEducacion(this.educacion.id)
    .subscribe( 
    {  next: data => {
      if (data != null) {
        console.log("Respuesta de api: "+ data);
      }else{
        console.log("Error!! educacion -> datos nulos");
      }
    }, 
    error: err  => {
      if(err.status === 504)
        alert("Error 504: El servicio api rest no responde");
    },
    complete: () => {console.log('Observer: Operación terminada.')
        this.route.navigate(['']);}
    });  

  }
  //BAJA EN HABILIDADES
  eliminaHabilidad(){
    if (!confirm("¿seguro que desea ELIMINAR su Habilidad:\n"
      +this.habilidad.descripcion+ " ?")) {
        alert("\'Ha cancelado la acción de ELIMINAR.\'");
        this.route.navigate(['']);
        return;
    }

    this.edicionService.delHabilidad(this.habilidad.id)
    .subscribe( 
    {  next: data => {
      if (data != null) {
        console.log("Respuesta de api: "+ data);
      }else{
        console.log("Error!! habilidad -> datos nulos");
      }
    }, 
    error: err  => {
      if(err.status === 504)
        alert("Error 504: El servicio api rest no responde");
    },
    complete: () => {console.log('Observer: Operación terminada.')
        this.route.navigate(['']);}
    });  

  }
  //BAJA EN PROYECTOS
  eliminaProyecto(){
    if (!confirm("¿seguro que desea ELIMINAR su Proyecto :\n"
      +this.proyecto.proyecto+ " ?")) {
        alert("\'Ha cancelado la acción de ELIMINAR.\'");
        this.route.navigate(['']);
        return;
    }

    this.edicionService.delProyecto(this.proyecto.id)
    .subscribe( 
    {  next: data => {
      if (data != null) {
        console.log("Respuesta de api: "+ data);
      }else{
        console.log("Error!! proyecto -> datos nulos");
      }
    }, 
    error: err  => {
      if(err.status === 504)
        alert("Error 504: El servicio api rest no responde");
    },
    complete: () => {console.log('Observer: Operación terminada.')
        this.route.navigate(['']);}
    });  

  }
//MODIFICA DADOS
modificar(){
  switch(this.seccionIn){
    case this.seccion.BANNER:{
      if(this.urlBanner.trim().length >= 5){
        this.modificarDatosPersonales();
      }else
        console.log('Error en edición: Ubicación Banner vacío.');
      break;
    }
    case this.seccion.PERFIL:{
      if(this.urlPerfil.trim().length >= 5){
        this.modificarDatosPersonales();
      }else
        console.log('Error en edición: Ubicación Foto de Perfil vacío.');
      break;
    }
    case this.seccion.ACERCA_DE:{
      if(this.sobreMi.trim().length >= 5){
        this.modificarDatosPersonales();
      }else
        console.log('Error en edición: \'Acerca de\' vacío.');
      break;
    }
    case this.seccion.EXP_LABORAL:{
      if(this.experiencia.nombreEmpresa.trim().length >= 5){
        this.modificaExpLaboral();
      }else
        console.log('Error en edición: Nombre Empresa vacío.');
      break;
    }
    case this.seccion.EDUCACION:{
      if(this.educacion.institucion.trim().length >= 5){
        this.modificaEducacion();
      }else
        console.log('Error en edición: Nombre Institución vacío.');
      break;
    }
    case this.seccion.HABILIDADES:{
      if(this.habilidad.descripcion.trim().length >= 5){
        this.modificaHabilidad();
      }else
        console.log('Error en edición: Descripcion de Habilidad vacío.');
      break;
    }
    case this.seccion.PROYECTOS:{
      if(this.proyecto.proyecto.trim().length >= 5){
        this.modificaProyecto();
      }else
        console.log('Error en edición: Nombre de Proyecto vacío.');

      break;
    }
    default:{
      console.log('Error en parámetro de sección');
    }
  }
}
  //EDICIÓN IMAGEN DE DATOS PERSONALES
  modificarDatosPersonales(){
    if(this.seccionIn === Seccion.BANNER || 
        this.seccionIn === Seccion.PERFIL || 
        this.seccionIn === Seccion.ACERCA_DE){
      /*
      if(!this.datosPersonalesModificados(
            this.urlBanner, this.loginService.urlBanner_bak) 
          || !this.datosPersonalesModificados(
            this.urlPerfil, this.loginService.urlFoto_bak)
          || !this.datosPersonalesModificados(
            this.sobreMi, this.sobreMi_bak)
        )
        return;
      */  
      if(this.loginService.datosPersonales.id > 0){
        switch(this.seccionIn){
          case Seccion.BANNER:{
            this.loginService.datosPersonales.urlBanner = this.urlBanner;
            break;
          }
          case Seccion.PERFIL:{
            this.loginService.datosPersonales.urlFoto = this.urlPerfil;
            break;
          }
          case Seccion.ACERCA_DE:{
            this.loginService.datosPersonales.sobreMi = this.sobreMi;
            break;
          }
          default:{
            console.log('Error: Sección NO identificada.');
            this.route.navigate(['']);
            return;
          }
        }
        //Modifica la ubicación de Imágenes de Banner/Foto de Perfil en Api/DBase  
        this.modificaDatosPersonales();
        this.route.navigate(['']);
      }else{
        alert('Error: Usuario sin acceso.');
      }
    }else{
      console.log('Error: Click en Sección No definida.');
    }
  }


  //true: Los Datos Personales han cambiado
  datosPersonalesModificados(datoActual: string, datoAnterior: string):boolean{
    if(datoActual == datoAnterior){
      console.log('Datos Personales SIN Cambios.');
      this.route.navigate(['']);
      return false;
    }
    return true;
  }
  //Acceso Api/edición de datos personales (urlBanner / urlFoto)
  modificaDatosPersonales(){
    this.loginService.nuevosDatosPersonales(this.loginService.datosPersonales)
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
    complete: () => console.log('Observer: Operación terminada.')
    });
  }

  //EDICIÓN DE EXPERIENCIA LABORAL
  //Acceso Api/edición de datos en una Experiencia Laboral
  modificaExpLaboral(){
    if(this.experiencia.isTrabajoActual)
      this.experiencia.fechaFin = null;
    this.edicionService.editExpLaboral(this.experiencia)
    .subscribe( 
    {  next: data => {
      if (data != null) {
        console.log("Respuesta de api: Datos Modificados.");
      }else{
        console.log("Error!! datos en Exp.Laboral nulos");
      }
    }, 
    error: err  => {
      if(err.status === 504)
        alert("Error 504: El servicio api rest no responde");
    },
    complete: () => {console.log('Observer: Operación terminada.')
      this.route.navigate(['']);}
    });

  }

  //EDICION DE EDUCACIÓN
  //Acceso Api/edición de datos en un Item de Educacion
  modificaEducacion(){
    this.edicionService.editEducacion(this.educacion)
    .subscribe( 
    {  next: data => {
      if (data != null) {
        console.log("Respuesta de api: Datos Modificados.");
      }else{
        console.log("Error!! datos en Educación nulos");
      }
    }, 
    error: err  => {
      if(err.status === 504)
        alert("Error 504: El servicio api rest no responde");
    },
    complete: () => {console.log('Observer: Operación terminada.')
      this.route.navigate(['']);}
    });

  }
  //EDICION DE HABILIDADES
  //Acceso Api/edición de datos en un Item de Habilidades
  modificaHabilidad(){
    this.edicionService.editHabilidad(this.habilidad)
    .subscribe( 
    {  next: data => {
      if (data != null) {
        console.log("Respuesta de api: Datos Modificados.");
      }else{
        console.log("Error!! datos en Habilidades nulos");
      }
    }, 
    error: err  => {
      if(err.status === 504)
        alert("Error 504: El servicio api rest no responde");
    },
    complete: () => {console.log('Observer: Operación terminada.')
      this.route.navigate(['']);}
    });

  }
  //EDICION DE PROYECTOS
  //Acceso Api/edición de datos en un Item de Proyectos
  modificaProyecto(){
    this.edicionService.editProyecto(this.proyecto)
    .subscribe( 
    {  next: data => {
      if (data != null) {
        console.log("Respuesta de api: Datos Modificados.");
      }else{
        console.log("Error!! datos en Proyecto nulos");
      }
    }, 
    error: err  => {
      if(err.status === 504)
        alert("Error 504: El servicio api rest no responde");
    },
    complete: () => {console.log('Observer: Operación terminada.')
      this.route.navigate(['']);}
    });

  }
//FIN MODIFICACIONES


  cancelarEdicion(){
    this.route.navigate(['']);
  }

  //resuelve la conversion de tipos enum/string por parámetros de manera casera
  tipoSeccion(tipo: string) : Seccion {
    switch(tipo) {
      case 'Seccion.BANNER':
        return Seccion.BANNER;
      case 'Seccion.PERFIL':
        return Seccion.PERFIL;
      case 'Seccion.ACERCA_DE':
        return Seccion.ACERCA_DE;
      case 'Seccion.EDUCACION':
        return Seccion.EDUCACION;
      case 'Seccion.EXP_LABORAL':
        return Seccion.EXP_LABORAL;
      case 'Seccion.HABILIDADES':
        return Seccion.HABILIDADES;
      case 'Seccion.PROYECTOS':
          return Seccion.PROYECTOS;
    }
    return -1;
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
    return -1;
  }

  //Al no funcionar split() en deploy web lo resuelvo en forma casera
  fecha(unaFecha: string):string{
    let res : string[] = [];
    let n = 0;
    let s: string = "", c: string= "";
    for(var i=0; i++; i<unaFecha.length){
      if(unaFecha.charAt(i) !== ','){
        s = s.concat(unaFecha.charAt(i));
      }
      else{
        if(n == 0){
          res[n] = s;
          s = "";
        }
        if(n == 1){
          res[n] = s;
          s = "";
        }
        n++;
      }
      if( n == 2 && i == unaFecha.length-1){
        res[n] = s;
      } 
      
    }
    c = res[2]+'-'+res[1]+'-'+res[0];
    return c;
  }
}
