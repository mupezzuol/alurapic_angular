import { NgModule } from '@angular/core';
import { DarkenOnHoverDirectvive } from './darken-on-hover.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        DarkenOnHoverDirectvive
    ],
    imports:[
        CommonModule
    ],
    exports: [
        DarkenOnHoverDirectvive
    ]
})
export class DarkenOnHoverModule{

}