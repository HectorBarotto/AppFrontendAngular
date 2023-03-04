import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { EdicionService } from 'src/app/services/edicion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  educacion = [{id:0, institucion:"", 
    titulo:"", descripcion:"",
    fechaInicio: new Date("1900-01-01"), fechaFin: new Date("1900-01-01"),
    urlLogo:"", idDatosPersonalesFK:0}]

  constructor(private route: Router,
    private edicionService: EdicionService,
    public loginService : LoginService) { }

  ngOnInit(): void {
    this.edicionService.getListaEducacion()
    .subscribe( 
      {
        next: data => {
          if(data != null){ //verifico no null para acceder a la propiedad
            this.educacion = data;
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
    this.route.navigate(['edicion/Form.AGREGA/Seccion.EDUCACION']);
  }
  modifica(idEducacion: number){
    this.route.navigate(['edicion/Form.MODIFICA/Seccion.EDUCACION/'+ idEducacion]);
  }
  elimina(idEducacion: number){
    this.route.navigate(['edicion/Form.BAJA/Seccion.EDUCACION/'+ idEducacion]);
  }
}
