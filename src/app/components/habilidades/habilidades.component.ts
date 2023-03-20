import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { EdicionService } from '../../services/edicion.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  habilidades = [{id:0, descripcion:"", nivel:0, idDatosPersonalesFK:0}]


  constructor(private route: Router,
    private edicionService: EdicionService,
    public loginService : LoginService) { }

  ngOnInit(): void {
    this.edicionService.getListaHabilidades()
    .subscribe( 
      {
        next: data => {
          if(data != null){ //verifico no null para acceder a la propiedad
            this.habilidades = data;
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
    this.route.navigate(['edicion/Form.AGREGA/Seccion.HABILIDADES']);
  }
  modifica(idHabilidad: number){
    this.route.navigate(['edicion/Form.MODIFICA/Seccion.HABILIDADES/'+ idHabilidad]);
  }
  elimina(idHabilidad: number){
    this.route.navigate(['edicion/Form.BAJA/Seccion.HABILIDADES/'+ idHabilidad]);
  }
}
