import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  //Array do tipo Object recebendo vazio
  photos: Photo[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  //Constructors -> Usado para injeção de dependencia
  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  //ngOnInit -> Usado para inicialização (usamos a interface 'OnInit' para auxiliar)
  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;
    
    //snapshot -> Me da uma fotografia de como estamos agora e usando 'data' pegamos os dados/retorno da propriedade setada 'photos' lá nas rotas
    //Irá apresentar quando tudo tiver 'RESOLVIDO', portanto o usuário não irá ver mensagens desnecessário em segundos
    this.photos = this.activatedRoute.snapshot.data['photos'];
  }

  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);//Atualizo as fotos novamente
        if (!photos.length) this.hasMore = false;
      });
  }

}
