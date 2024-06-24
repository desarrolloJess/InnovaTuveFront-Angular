import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './componentes/user/user.module';
import { UsuariosService } from './componentes/user/usuarios.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,UserModule],
  providers: [UsuariosService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InnovaTubeFront';

  verLogin : boolean;
  
  constructor(public UsuariosService : UsuariosService){
    this.verLogin = true;
  }


  cambiarVista(){
    if(this.verLogin){
      this.verLogin = false;
    }else{
      this.verLogin = true;
    }
  }




}
