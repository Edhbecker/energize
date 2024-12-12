import { Routes } from '@angular/router';
import { HomeComponent } from './pagina/home/home.component';
import { LoginComponent } from './pagina/login/login.component';
import { CriarcontaComponent } from './pagina/criarconta/criarconta.component';


export const routes: Routes = [
    { path: '', component:  HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: CriarcontaComponent }
];
