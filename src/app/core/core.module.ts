import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations:[
        HeaderComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class CoreModule{

}