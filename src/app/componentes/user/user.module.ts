import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { UsuariosService } from './usuarios.service';
import { HomeComponent } from './home/home.component';
import { VideosService } from './videos.service';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RecaptchaModule
  ],
  exports : [
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  providers : [
     UsuariosService,
     VideosService
  ]
})
export class UserModule { }
