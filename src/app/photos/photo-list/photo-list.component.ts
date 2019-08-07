import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';

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
    private photoService: PhotoService,
    private loadingService: LoadingService
  ) { }

  //ngOnInit -> Usado para inicialização (usamos a interface 'OnInit' para auxiliar)
  ngOnInit(): void {
    this.loadingService.start();
    //Em nossa ROTA ela retornar um OBSERVABLE, nesse caso em nossa aplicação estamos usando o SUBCRIBE para -> Ficar escutando as mudanças
    // Essas mudanças é de rota de usuároo X para usuário Y, toda vez que ele fizer isso ele não recarrega a página, por isso fazemos isso,
    // toda vez q alterar a rota nós vamos atualizar as fotos daquele usuário, dessa forma não ficará com fotos de outro usuario na URL de outro usuario
    this.activatedRoute.params.subscribe(params => {
      this.userName = params.userName;
      this.photos = this.activatedRoute.snapshot.data['photos'];
    });

    
    
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
