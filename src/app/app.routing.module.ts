import { GlobalErrorComponent } from './errors/global-error/global-error.component';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth/auth.guard';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';

//Crio uma separação das URL's, ao acessar home, ele ira concatenar tudo q vem dps como por exemplo: /home/singup e /home/signin
// pathMatch: 'full' -> Faz com que nós queremos a URL exato, caso contrário ele irá se perder nas rotas
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
    
    {
        path: 'user/:userName',
        component: PhotoListComponent,
        resolve: {
            photos: PhotoListResolver
        },
        data: { 
            title: 'Timeline'
        }
    },

    {
        path: "p/add",
        component: PhotoFormComponent,
        canActivate: [AuthGuard],
        data: { 
            title: 'Photo Upload'
        }
    },

    {
        path: "p/:photoId",
        component: PhotoDetailsComponent,
        data: { 
            title: 'Photo Detail'
        }
    },

    {
        path: "error",
        component: GlobalErrorComponent,
        data: { 
            title: 'Error'
        }
    },
    {
        path: "not-found",
        component: NotFoundComponent,
        data: { 
            title: 'Not found'
        }
    },
    {
        path: "**",
        redirectTo: 'not-found'
    }
];

//forRoot -> Endereço localhost... a partir dele aceitar as rotas que está em array do tipo Routes
@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}