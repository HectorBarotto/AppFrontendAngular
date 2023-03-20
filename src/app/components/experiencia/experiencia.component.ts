import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { EdicionService } from '../../services/edicion.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experiencia = [{id:0, nombreEmpresa:"", 
    puesto:"", isTrabajoActual: false,
    fechaInicio: new Date("1900-01-01"), fechaFin: new Date("1900-01-01"),
    descripcion:"", urlLogo:"", idDatosPersonalesFK:0}]

  constructor(private route: Router,
    private edicionService: EdicionService,
    public loginService : LoginService) { }

  ngOnInit(): void {
    this.edicionService.getListaExperiencias()
      .subscribe( 
        {
          next: data => {
            if(data != null){ //verifico no null para acceder a la propiedad
              this.experiencia = data;
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

  agrega(){
    this.route.navigate(['edicion/Form.AGREGA/Seccion.EXP_LABORAL']);
  }
  modifica(idExpLaboral: number){
    this.route.navigate(['edicion/Form.MODIFICA/Seccion.EXP_LABORAL/'+ idExpLaboral]);
  }
  elimina(idExpLaboral: number){
    this.route.navigate(['edicion/Form.BAJA/Seccion.EXP_LABORAL/'+ idExpLaboral]);
  }
}
