import { Component, OnInit } from '@angular/core';

import { PhotoService } from '../photo/photo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  //Array do tipo Object recebendo vazio
  photos: Object[] = [];

  //Constructors -> Usado para injeção de dependencia
  constructor(
    private photoService: PhotoService,
    private activatedRoute: ActivatedRoute
  ) { }

  //ngOnInit -> Usado para inicialização (usamos a interface 'OnInit' para auxiliar)
  ngOnInit(): void {

    //Atribuo meu parametro passado na URL/Rota em uma variavel
    const userName = this.activatedRoute.snapshot.params.userName;

    this.photoService.listFromUser(userName)
      .subscribe(photos => {
        this.photos = photos
      });
  }

}
