import { AlertModule } from './../shared/components/alert/alert.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FooterComponent } from './footer/footer.component';
import { RequestInterceptor } from './auth/request.interceptor';
import { HeaderComponent } from './header/header.component';
import { LoadingModule } from '../shared/components/loading/loading.module';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { MenuModule } from '../shared/components/menu/menu.module';
import { ShowIfLoggedModule } from '../shared/directives/show-if-logged/show-if-logged.module';
// providers -> Adicono um Objeto dizendo sobre qual INTERCEPTADOR ele usará nas requisições, nesse caso eu passo a classe customizada 'RequestInterceptor'
// multi -> é que se tiver outro INTERCEPTADOR ele poderá seguir em frente
@NgModule({
    declarations:[
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        AlertModule,
        LoadingModule,
        MenuModule,
        ShowIfLoggedModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent
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