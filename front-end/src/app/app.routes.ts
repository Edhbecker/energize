import { Routes } from '@angular/router';
import { HomeComponent } from './pagina/home/home.component';
import { LoginComponent } from './pagina/login/login.component';
import { CriarcontaComponent } from './pagina/criarconta/criarconta.component';
import { CadastroComponent } from './pagina/cadastro/cadastro.component';
import { SobrenosComponent } from './pagina/sobrenos/sobrenos.component';


export const routes: Routes = [
    { path: '', component:  HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: CriarcontaComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'sobrenos', component: SobrenosComponent }
];
