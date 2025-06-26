import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) {}

    canActivate() {
        if (!this.loginService.logueado) {
            console.log('No estás logueado');
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}