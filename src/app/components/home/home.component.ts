import { Component, OnInit} from '@angular/core';
import { LoginService} from '../../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']})

export class HomeComponent implements OnInit {

  stylePerfil = "style-img-perfil-in-home";
  urlBanner!: string;

  constructor(public loginService : LoginService) { 
  }

  ngOnInit(): void {
    this.urlBanner = this.loginService.datosPersonales.urlBanner;
  }

}
