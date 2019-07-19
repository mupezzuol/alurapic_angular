import { Component, OnInit } from '@angular/core';

import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

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
