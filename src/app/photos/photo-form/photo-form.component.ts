import { HttpProgressEvent, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { UserService } from './../../core/user/user.service';
import { PhotoService } from './../photo/photo.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;//Receberá a foto no formato base64 para apresentar como preview
  percentDone = 0;

  constructor(
      private formBuilder: FormBuilder,
      private photoService: PhotoService,
      private router: Router,
      private alertService: AlertService,
      private userService: UserService) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true] //Valor inicializado será TRUE, ou seja, virá ticado, porém não terá validação nenhuma
    });
  }

  upload(){
    const desc = this.photoForm.get('description').value;//Pegando valor solto
    const allowComments = this.photoForm.get('allowComments').value;//Pegando valor solto

    //pipe + finalize() -> Ele será um código que será exetuado, dando certo ou erro, ele sempre executará isso,
    // como a navegação é a mesma tanto para erro ou acerto, jogamos aqui o codigo
    //Quando nós usamos '(event: HttpEvent<any>)' nós conseguimos pegar o HttpEventType, onde temos o progresso de upload do arquivos etc...
    //Com isso a requisição do corpo será chamado a cada percentual novo etc... portanto usamos alguma condições para tratar isso
    //Verificamos se o progresso ainda continua, se sim a gnt cria uma forma de calcualr percentual etc..
    //Se o evento for igual a Response, é pq terminou e finalizou a chamada..
    this.photoService
      .upload(desc, allowComments, this.file)
      .pipe(finalize( () => {
        this.router.navigate(['/user', this.userService.getUserName()])//Jogo o usuário para timeline dele
      }))
      .subscribe(
        (event: HttpEvent<any>) => {
          //A cada interação eu vou calcular a %
          //Se o upload for distribuido em 25%, será efetuado 4 chamadas nesse IF, portanto fará 25%, 50% etc.. até finalizar e cair no 'Response'
          if (event.type == HttpEventType.UploadProgress){
            this.percentDone = Math.round(100 * event.loaded / event.total); //Calculando o percentual do Progress da requisição

          } else if (event instanceof HttpResponse){//Se o evento atual for a mesma instnacia de HttpResponse é pq temos uma resposta, ou seja o progress acabou
            //Aqui é quando acabou o progress e eu obtive a resposta
            this.alertService.success('Upload complete', true);
          }
        },
        err => {
          console.log(err);
          this.alertService.danger('Upload Error!', true);
        });

  }


  //Lendo o arquivo + convertendo para base64 + jogando na variavel preview
  handleFile(file: File){
    this.file = file;//Pego o file do HTML
    const reader = new FileReader();//Uso o FileReader para converter o File para base64 etc...

    //'onload' -> Qnd terminar o seu trabalho nós iremos adicionar o valor do 'event' em nossa variavel de preview do tipo String com a conversão em base64
    // Por ser assincrona retorna um Callback, portanto nós usamos ArrowFunction
    reader.onload = (event: any) => this.preview = event.target.result;//Result -> é onde tem o resultado do readAsDataURL'
    reader.readAsDataURL(file);//Lendo a URL do file
  }


}
