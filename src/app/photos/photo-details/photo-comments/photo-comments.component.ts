import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { PhotoService } from './../../photo/photo.service';
import { PhotoComment } from './../../photo/photo-comment';

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html'
})
export class PhotoCommentsComponent implements OnInit{
    
    //ID recebemos através do INBOUND PROPERTIES que já foi usado no component de photo-details e que passamos aquele valor pra cá também...
    @Input() photoId: number;
    comments$: Observable<PhotoComment[]>;
    commentForm: FormGroup;

    constructor(
        private photoService: PhotoService,
        private formBuilder: FormBuilder) { }
    
    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);

        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        });

    }

}