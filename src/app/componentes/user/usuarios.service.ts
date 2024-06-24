import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = 'http://localhost:5257/api/Usuarios'; 

  constructor(private http: HttpClient, private router : Router) { } 

  registrarUsuario(usuario: any, recaptchaToken: string) {
    return this.http.post<any>(`${this.url}/registrarUsuario`, usuario, { params: { recaptchaToken } });
  }

  validarUsuario(usuario : any){
    return this.http.post<any>(`${this.url}/validarUsuario`, usuario);
  }


    login(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  logout() {
    localStorage.removeItem('usuario');
  }

  getUsuario(): any {
    return JSON.parse(localStorage.getItem('usuario') || '{}');
  }

  isLoggedIn(): boolean {
    const usuario = this.getUsuario();
    return usuario && usuario.nombreCompleto !== undefined;
  }

  redirectToHomeIfLoggedIn() {
    if (this.isLoggedIn()) {
      this.router.navigate(['/home']); 
    }
  }
}