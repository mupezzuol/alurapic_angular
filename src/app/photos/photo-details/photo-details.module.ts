import { VMessageModule } from './../../shared/components/vmessage/vmessage.module';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import { NgModule } from '@angular/core';
import { PhotoDetailsComponent } from './photo-details.component';
import { CommonModule } from '@angular/common';
import { PhotoModule } from '../photo/photo.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        PhotoDetailsComponent,
        PhotoCommentsComponent
    ],
    imports: [
        CommonModule,
        PhotoModule,
        RouterModule,
        ReactiveFormsModule,
        VMessageModule
    ],
    exports:[
        PhotoDetailsComponent,
        PhotoCommentsComponent
    ]
})
export class PhotoDetailsModule{

}