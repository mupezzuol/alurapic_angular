import { Component, OnInit } from '@angular/core';

import { PhotoService } from '../photo/photo.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo/photo';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  //Array do tipo Object recebendo vazio
  photos: Photo[] = [];
  filter: string = '';

  //Constructors -> Usado para injeção de dependencia
  constructor( private activatedRoute: ActivatedRoute) { }

  //ngOnInit -> Usado para inicialização (usamos a interface 'OnInit' para auxiliar)
  ngOnInit(): void {
    //snapshot -> Me da uma fotografia de como estamos agora e usando 'data' pegamos os dados/retorno da propriedade setada 'photos' lá nas rotas
    //Irá apresentar quando tudo tiver 'RESOLVIDO', portanto o usuário não irá ver mensagens desnecessário em segundos
    this.photos = this.activatedRoute.snapshot.data['photos'];
  }

}
