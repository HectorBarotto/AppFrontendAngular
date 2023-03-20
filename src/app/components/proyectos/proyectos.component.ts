import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { EdicionService } from '../../services/edicion.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyecto = [{id:0, proyecto:"", descripcion:"",
    fechaInicio: new Date("1900-01-01"), fechaFin: new Date("1900-01-01"),
    url:"", urlLogo:"", idDatosPersonalesFK:0}]

  constructor(private route: Router,
    private edicionService: EdicionService,
    public loginService : LoginService) { }

  ngOnInit(): void {
    this.edicionService.getListaProyectos()
    .subscribe( 
      {
        next: data => {
          if(data != null){ //verifico no null para acceder a la propiedad
            this.proyecto = data;
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
    this.route.navigate(['edicion/Form.AGREGA/Seccion.PROYECTOS']);
  }
  modifica(idProyecto: number){
    this.route.navigate(['edicion/Form.MODIFICA/Seccion.PROYECTOS/'+ idProyecto]);
  }
  elimina(idProyecto: number){
    this.route.navigate(['edicion/Form.BAJA/Seccion.PROYECTOS/'+ idProyecto]);
  }
}
