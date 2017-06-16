import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth-service';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit {

  constructor(private authService: AuthService) { }
  
  private title: string = 'SimImóveis';
  private aluguel: string = 'Aluguel';
  private financiamento: string = 'Financiamento';
  private consorcio: string = 'Consórcio';
  private global: string = 'Taxas';
  private isLoading = true;

  ngOnInit(): void {
    this.authService.VerifyAuth().subscribe((user) => {
      if(user) {
        this.authService.isLogged = true;
        this.authService.uId = user.uid;
      } else {
        this.authService.isLogged = false;
      }
      this.isLoading = false;
    });  
  }

  private logout(): void {
    this.authService.Loggout();
  }
}
