import { LoginGuard } from '../core/auth/login.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './signup/signup.component';
import { SignInComponent } from './signin/signin.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [LoginGuard],
        children:[
            {
                path: '',
                component: SignInComponent,
                data: { 
                    title: 'Sign in'
                }
            },
            {
                path: 'signup',
                component: SignUpComponent,
                data: { 
                    title: 'Sign up'
                }
            }
        ]
    }
];

//forRoot -> Endereço localhost... a partir dele aceitar as rotas que está em array do tipo Routes
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule {

}