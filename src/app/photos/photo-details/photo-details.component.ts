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

        //Busco minhas fotos, e trato quando não tiver foto, mando para página de NOT-FOUND
        this.photo$.subscribe(() => {}, err => {
            console.log(err.message);
            this.router.navigate(['not-found']);
        })
    }

    remove(){
        this.photoService
            .removePhoto(this.photoId)
            .subscribe(
                () => {
                    //Chamamos o método que monta o alerta de sucesso passando a mensagem que no component de 'header' chamou o component de 'alert' que fica escutando 'subject'
                    //Assim que é alterado o component altera também e é sempre envaziado o array de mensagem a cada 3 segundos
                    //ReplaceUrl: true -> Detona a rota do history do navegador, pois qnd deletar, ele clicar em voltar pelo browser, ele não acessa mais
                    this.alertService.success('Photo removed', true);
                    this.router.navigate(['/user', this.userService.getUserName(), { replaceUrl: true }]);
                },
                err => {
                    console.log(err.message);
                    this.alertService.warning('Could not delete the photo!');
                });
    }

    like(photo: Photo) {
        //O meu OBSERVABLE retorna um boolean, de acordo com oq foi implementado no Serviço de PhotosService
        //Eu verifico o retorno, se for TRUE, é pq ele já foi CLICADO, portanto eu chamo o serviço que lista a foto para atualizar, 
        //caso contrário é pq ele clicou a primeira vez e segue fluxo normal
        this.photoService
            .like(photo.id)
            .subscribe(liked => {
                if(liked) {
                    this.photo$ = this.photoService.findById(photo.id);
                }
            });
    }
    
}