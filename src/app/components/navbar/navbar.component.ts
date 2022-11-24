import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
//import { AppRoutingModule} from '../app-routing/app-routing.module';
import { LoginService} from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css','../../../assets/social-bar/font.css']
})
export class NavbarComponent implements OnInit {

  constructor(public loginService: LoginService, 
    private router:Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.loginService.modoEdicion = false;
    this.router.navigate(['/login']);
  }

  showElement(mostrar : boolean): void{
    /* invierte el valor boolean cada vez que hace click en login btn
    this.loginService.mostrarIconos? this.loginService.mostrarIconos=false:
    this.loginService.mostrarIconos=true;
    */
    this.loginService.modoEdicion = mostrar;
  }

}
