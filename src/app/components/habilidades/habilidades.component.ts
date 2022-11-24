import { Component, OnInit } from '@angular/core';
import { LoginService} from '../../services/login.service';


@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  constructor(public loginService : LoginService) { }

  ngOnInit(): void {
  }

}
