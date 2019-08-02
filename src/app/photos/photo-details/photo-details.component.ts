import { PhotoComment } from './../photo/photo-comment';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { PhotoService } from './../photo/photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';

@Component({
    selector: 'ap-photo-details',
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit{
    
    //Vamos utilizar o ASYNC + PIPE para tratar erros em console etc... boa prática
    photo$: Observable<Photo>;
    photoId: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private photoService: PhotoService) { }
    
    ngOnInit(): void {
        //snapshot -> Fotografia atual de onde estou, componentes etc... ou seja, contexto atual que seria o rounterLink etc...
        //Params -> é para pegar os parametros que foram passados + o nome passado é o mesmo nome usado na URL (nome coringa) no arquivo de rotas ':photoId'
        this.photoId = this.route.snapshot.params.photoId;
        
        //Usamos o ASYNC + PIPE e o Subscribe é feito no HTML na expressão passada pro *ngIf
        this.photo$ = this.photoService.findById(this.photoId);
    }

    remove(){
        this.photoService
            .removePhoto(this.photoId)
            .subscribe(() => this.router.navigate(['']));
    }
    
}