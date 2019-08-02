import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PhotoOwnerOnlyDirective } from './photo-owner-only/photo-owner-only.directive';
import { VMessageModule } from './../../shared/components/vmessage/vmessage.module';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoModule } from '../photo/photo.module';

@NgModule({
    declarations: [
        PhotoDetailsComponent,
        PhotoCommentsComponent,
        PhotoOwnerOnlyDirective
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