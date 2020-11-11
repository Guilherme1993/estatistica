import { Routes } from '@angular/router';

import { AuthGuard } from './account/shared/auth.guard';

import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { HomeComponent } from './layout/home/home.component';
import { DescritivaComponent } from './restricted/descritiva/descritiva.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { LoginComponent } from './account/login/login.component';
import { ProbabilidadeComponent } from './restricted/probabilidade/probabilidade.component';

export const AppRoutes: Routes = [{
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [{
        path: '',
        redirectTo: 'estatistica-descritiva',
        pathMatch: 'full'
    },
    {
        path: 'estatistica-descritiva',
        component: DescritivaComponent
    }, {
        path: 'probabilidade',
        component: ProbabilidadeComponent
    }]
}, {
    path: '',
    component: AuthenticationComponent,
    children: [{
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    }, {
        path: 'create-account',
        component: CreateAccountComponent
    }]
}];