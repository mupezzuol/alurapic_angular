import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';

const routes: Routes = [
    {path: "user/flavio", component: PhotoListComponent},
    {path: "p/add", component: PhotoFormComponent}
];

//forRoot -> Endereço localhost... a partir dele aceitar as rotas que está em array do tipo Routes
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule{

}