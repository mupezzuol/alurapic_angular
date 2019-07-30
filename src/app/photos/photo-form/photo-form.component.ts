import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PhotoService } from './../photo/photo.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;//Receberá a foto no formato base64 para apresentar como preview

  constructor(
      private formBuilder: FormBuilder,
      private photoService: PhotoService,
      private router: Router) { }

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

    this.photoService
      .upload(desc, allowComments, this.file)
      .subscribe(() => this.router.navigate(['']));

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
