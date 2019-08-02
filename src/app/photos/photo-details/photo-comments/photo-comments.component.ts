import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { PhotoService } from './../../photo/photo.service';
import { PhotoComment } from './../../photo/photo-comment';

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['./photo-comments.component.css']
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

    save(){
        //Pego valor do INPUT de comentários
        const comment = this.commentForm.get('comment').value as string;
        

        /*
        1. Faço meu comments receber as instruções, pois o último OBSERVABLE a ser executado é o de getComments() que retornar comments
        2. Eu executo o primeiro observable, que é o addComment
        3. Usando o PIPE eu chamo o switchMap que vai executar a operação de outro OBSERVABLE após o observable anterior ter sido concluido
        4. Após executar os dois OBSERVABLE precisamos limpar o formulário, ou seja, precisamos executar alguns comandos após ele finalizar as operaçõrs,
        por isso nós usamos o 'tap' que literamente da um TAPA no código ao final dele, nesse caso quando tudo terminar nós limparemos o formulário

        OBS: Lembre-se, nós sempre adc no PIPE esses tipos de verificações... pois é um canal onde será efetuado processos e terá uma saída
        */
       this.comments$ = this.photoService
            .addComments(this.photoId, comment) //Quando
            .pipe( 
                switchMap(() => this.photoService.getComments(this.photoId)))
            .pipe(
                tap( () => {
                this.commentForm.reset();
                // alert('Comentário adicionado com sucesso!');
            }));

    }

}