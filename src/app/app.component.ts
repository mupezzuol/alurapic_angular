import { Component, OnInit } from '@angular/core';
import { PhotoService } from './photos/photo/photo.service';

//Component -> É um decorator, nele configuramos 'metadata' que determina como componente irá ser processado, instanciado, usado etc...
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //Array do tipo Object recebendo vazio
  photos: Object[] = [];

  //Constructors -> Usado para injeção de dependencia
  constructor(private photoService: PhotoService) {

  }

  //ngOnInit -> Usado para inicialização (usamos a interface 'OnInit' para auxiliar)
  ngOnInit(): void {
    
    this.photoService.listFromUser('flavio')
      .subscribe(photos => {
        console.log(photos[0].userId);
        this.photos = photos
      });
  }



}
