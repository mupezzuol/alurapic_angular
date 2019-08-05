import { UserService } from './../../core/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { PhotoService } from './../photo/photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/shared/components/alert/alert.service';

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
        private photoService: PhotoService,
        private alertService: AlertService,
        private userService: UserService) { }
    
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
            .subscribe(
                () => {
                    //Chamamos o método que monta o alerta de sucesso passando a mensagem que no component de 'header' chamou o component de 'alert' que fica escutando 'subject'
                    //Assim que é alterado o component altera também e é sempre envaziado o array de mensagem a cada 3 segundos
                    this.alertService.success('Photo removed', true);
                    this.router.navigate(['/user', this.userService.getUserName()]);
                },
                err => {
                    console.log(err.message);
                    this.alertService.warning('Could not delete the photo!');
                });
    }
    
}