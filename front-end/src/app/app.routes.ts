
import { Routes } from '@angular/router';
import { HomeComponent } from './pagina/home/home.component';
import { LoginComponent } from './pagina/login/login.component';
import { CriarcontaComponent } from './pagina/criarconta/criarconta.component';
import { CadastroComponent } from './pagina/cadastro/cadastro.component';
import { SobrenosComponent } from './pagina/sobrenos/sobrenos.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'criarconta', component: CriarcontaComponent },
    { path: 'cadastro', component: CadastroComponent, canActivate: [AdminGuard] },
    { path: 'sobrenos', component: SobrenosComponent }
];
