import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './signin/signin.component';

//Para ser acesso via app.module não preciso usar o EXPORTS, pois não estamos acessando Template nem nada...
@NgModule({
    declarations: [
        SignInComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class HomeModule{

}