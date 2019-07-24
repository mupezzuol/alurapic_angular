import { NgModule } from '@angular/core';
import { SignInComponent } from './signin/signin.component';
import { CommonModule } from '@angular/common';

//Para ser acesso via app.module não preciso usar o EXPORTS, pois não estamos acessando Template nem nada...
@NgModule({
    declarations: [
        SignInComponent
    ],
    imports: [
        CommonModule
    ]
})
export class HomeModule{

}