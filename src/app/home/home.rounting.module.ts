import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './signup/signup.component';
import { SignInComponent } from './signin/signin.component';
import { AuthGuard } from './../core/auth/auth.guard';
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
        canActivate: [AuthGuard],
        children:[
            {
                path: '',
                component: SignInComponent,
            },
            {
                path: 'signup',
                component: SignUpComponent,
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