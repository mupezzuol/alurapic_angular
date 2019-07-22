import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoComponent } from "./photo/photo.component";
import { PhotoFormComponent } from './photo-form/photo-form.component';

//Declarando um novo módulo
@NgModule({
    declarations: [ 
        PhotoComponent, 
        PhotoListComponent, 
        PhotoFormComponent ],
    imports: [ 
        HttpClientModule,
        CommonModule
    ]
})
export class PhotosModule{

}