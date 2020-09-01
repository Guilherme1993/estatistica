import { Routes } from '@angular/router';

import { AuthGuard } from './account/shared/auth.guard';

import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { HomeComponent } from './layout/home/home.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { LoginComponent } from './account/login/login.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [{
            path: '',
            component: HomeComponent
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