import { LoadingInterceptor } from './loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading.component';

@NgModule({
    declarations: [
        LoadingComponent
    ],
    imports:[
        CommonModule
    ],
    exports: [
        LoadingComponent
    ],
    providers:[{
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi: true
    }]
})
export class LoadingModule{

/*

Providers -> Atribuimos ele alguns interceptadores

- provide: Colocamos qual provide que será interceptador, o tipo nesse caso é HTTP_INTERCEPTORS
- useClass: Qual classe está implementando esse interceptor
- multi: true significa que se tiver outros interceptadores ele seja aplicado/usado também


*/



}