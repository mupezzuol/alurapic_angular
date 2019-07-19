import { Component } from '@angular/core';
import { PhotoService } from './photos/photo/photo.service';

//Component -> É um decorator, nele configuramos 'metadata' que determina como componente irá ser processado, instanciado, usado etc...
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //Array do tipo Object recebendo vazio
  photos: Object[] = [];

  constructor(photoService: PhotoService){

    photoService.listFromUser('flavio')
      .subscribe(photos => {
        console.log(photos[0]);
        this.photos = photos
      },);

  }



}
