import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { EdicionService } from '../../services/edicion.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  urlFoto!: string;
  @Input() styleInHome: string = "style-img-perfil-not-in-home";

  educacion = [{id:0, institucion:"", 
  titulo:"", descripcion:"",
  fechaInicio: new Date('1900-01-01'), fechaFin: null,
  urlLogo:"", idDatosPersonalesFK:0}]
  
  titulos: string[] = []; //Lista con hasta dos últimos títulos de estudio
  ultInst = {institucion:"", urlLogo:""}

  constructor(private route: Router,
    private edicionService: EdicionService,
    public loginService : LoginService) {
  }
  
  ngOnInit(): void {
    this.urlFoto = this.loginService.datosPersonales.urlFoto;
    this.edicionService.getListaEducacion()
    .subscribe( 
      {
        next: data => {
          if(data != null){ //verifico no null para acceder a la propiedad
            this.educacion = data;
            if(this.educacion.length > 0){
              //Ordena los items por fecha inicio más recientes
              this.educacion.sort(function (a, b) {
                  // A va primero que B
                  if (a.fechaInicio < b.fechaInicio)
                      return 1;
                  // B va primero que A
                  else if (a.fechaInicio > b.fechaInicio)
                      return -1;
                  // A y B son iguales
                  else 
                      return 0;
              });
              //Asigna datos de la última institución/organización donde estudió
              this.ultInst.institucion = this.educacion[0].institucion;
              this.ultInst.urlLogo = this.educacion[0].urlLogo;
              //Asigna al menos los últimos dos títulos cursados
              for(let i=0; i < this.educacion.length; i++){
                this.titulos[i] = this.educacion[i].titulo;
                if(i >= 1) 
                  i = this.educacion.length;
              }
            }

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

  editar(event: any){
    // Get the source element
    let element = event.target || event.srcElement || event.currentTarget;
    // Get the id of the source element
    let elementId = element.id;

    if(elementId === 'btnUrlPerfil')
      this.route.navigate(['edicion/Form.MODIFICA/Seccion.PERFIL']);
    else if(elementId === 'btnSobreMi')
      this.route.navigate(['edicion/Form.MODIFICA/Seccion.ACERCA_DE']);
    else
      this.route.navigate(['']);
  }

}
