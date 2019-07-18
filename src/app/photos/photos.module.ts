import { NgModule } from "@angular/core";
import { PhotoComponent } from "./photo/photo.component";

//Declarando um novo módulo
@NgModule({
    declarations: [ PhotoComponent ],
    exports: [ PhotoComponent ]
})
export class PhotosModule{

}