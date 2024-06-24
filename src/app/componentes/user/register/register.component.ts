import { Component,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuarioNuevo } from '../../../modelos/usuarios';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  @Output() newItemEvent = new EventEmitter<string> ();

  usuario : IUsuarioNuevo = {
    NombreCompleto: '',
    NombreUsuario: '',
    CorreoElectronico: '',
    Contrasenia: ''
  };
  
  public alerta: string = '';
  recaptchaToken: string = '';
  confirmarContrasenia: string = '';

  constructor(private router: Router,
     private UsuariosService: UsuariosService
  ) {}

  executeRecaptchaVisible(token:any){
    console.log(token);    
    this.recaptchaToken = token;
  }

  limpiarFormulario(){
    this.usuario.NombreCompleto = '';
    this.usuario.NombreUsuario = '';
    this.usuario.CorreoElectronico = '';
    this.usuario.Contrasenia = '';
    this.recaptchaToken = '';
  }

  onSubmit() {
    if (!this.usuario.NombreCompleto || !this.usuario.NombreUsuario || !this.usuario.CorreoElectronico || !this.usuario.Contrasenia) {
      this.alerta = 'Todos los campos son obligatorios.';
      return;
    }
    if (this.usuario.Contrasenia !== this.confirmarContrasenia) {
      this.alerta = 'Las contraseñas no coinciden.';
      return;
    }
    if (this.recaptchaToken === '') {
      this.alerta = 'Favor de completar el captcha';
      return;
    }

    this.UsuariosService.registrarUsuario(this.usuario, this.recaptchaToken).subscribe(
      response => {
        console.log('Usuario registrado:', response);
        this.alerta = 'Usuario registrado correctamente';
        this.limpiarFormulario();
        this.redireccionar();
      },
      error => {
        console.error('Error al registrar usuario:', error);
        this.alerta = 'Error: ' + error.error;
        this.limpiarFormulario();
      }
    );
    
  }

  cerrarAlerta() {
    this.alerta = '';
  }

  redireccionar(){
    this.newItemEvent.emit();
  }

  
}
