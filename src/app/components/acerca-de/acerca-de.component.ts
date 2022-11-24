import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  @Input() styleInHome: string = "style-img-perfil-not-in-home";

  constructor(public loginService : LoginService) {
  }

  ngOnInit(): void {
  }
  
}
