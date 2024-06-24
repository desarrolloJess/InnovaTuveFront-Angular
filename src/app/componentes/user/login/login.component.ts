import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../usuarios.service';
import { IUsuarioSesion } from '../../../modelos/iniciarUsuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @Output() newItemEvent = new EventEmitter<string> ();
  

  constructor(private router: Router,
    private UsuariosService: UsuariosService
  ) {}

  redireccionar(){
    this.newItemEvent.emit();
  }

  public alerta: string = '';
  usuario : IUsuarioSesion = {
    CorreoElectronico : '',
    Contrasenia : ''
  }

  iniciarSesion(){
    if (!this.usuario.CorreoElectronico || !this.usuario.Contrasenia) {
      this.alerta = 'Por favor ingresa el correo electrónico y la contraseña.';
      return; 
    }
    this.UsuariosService.validarUsuario(this.usuario).subscribe(
      response => {
        this.UsuariosService.login(response);
        this.UsuariosService.redirectToHomeIfLoggedIn();
        this.limpiarFormulario();
        //this.redireccionar();
      },
      error => {
        console.error('Error acceder:', error);
        this.alerta = 'Error: ' + error.error;
        this.limpiarFormulario();
      }
    )
  }

  limpiarFormulario(){
    this.usuario.CorreoElectronico = '';
    this.usuario.Contrasenia = '';
  }

  cerrarAlerta() {
    this.alerta = '';
  }

}
