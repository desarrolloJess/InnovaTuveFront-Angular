import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/user/login/login.component';
import { RegisterComponent } from './componentes/user/register/register.component';
import { HomeComponent } from './componentes/user/home/home.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'registrar', component: RegisterComponent },
    { path: 'home', component: HomeComponent }
  ];
