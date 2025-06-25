import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    public logueado: boolean = false;

    constructor(private http: HttpClient) {}

    public login(email:any, password:any) {
    let userLogin = { email: email, password: password };
    return this.http.post('http://localhost:3000/login', userLogin).pipe(
        map((res: any) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('usuario', JSON.stringify(res.usuario));
            return res;
        })
    );
  }
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
  public loggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}