import { Component, OnInit} from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  constructor(public loginService : LoginService) { }

  ngOnInit(): void {
  }

}
