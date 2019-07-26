import { RequestInterceptor } from './auth/request.interceptor';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// providers -> Adicono um Objeto dizendo sobre qual INTERCEPTADOR ele usará nas requisições, nesse caso eu passo a classe customizada 'RequestInterceptor'
// multi -> é que se tiver outro INTERCEPTADOR ele poderá seguir em frente
@NgModule({
    declarations:[
        HeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        HeaderComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ]
})
export class CoreModule{

}