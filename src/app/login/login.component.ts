import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth-service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    
    constructor(private authService: AuthService,
                private router: Router) { }
    
    private login(value: string): void {
        this.authService.Loggin(value)
        .then((user) => {
            this.router.navigate(['home']);
        });
    }
}
