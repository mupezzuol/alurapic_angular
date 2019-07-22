import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Photo } from '../photo/photo';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  //Array do tipo Object recebendo vazio
  photos: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();

  //Constructors -> Usado para injeção de dependencia
  constructor(private activatedRoute: ActivatedRoute) { }

  //ngOnInit -> Usado para inicialização (usamos a interface 'OnInit' para auxiliar)
  ngOnInit(): void {
    //snapshot -> Me da uma fotografia de como estamos agora e usando 'data' pegamos os dados/retorno da propriedade setada 'photos' lá nas rotas
    //Irá apresentar quando tudo tiver 'RESOLVIDO', portanto o usuário não irá ver mensagens desnecessário em segundos
    this.photos = this.activatedRoute.snapshot.data['photos'];

    //RxJS utilizando Subject
    //Adiciono o valor no 'next' do debounce e atribuo para o Filter, mesma forma que as normais, porém usando debounce posso utilizar esse PIPE
    //Usando PIPE nós conseguimos atribuir tempo de busca do filter, dessa forma melhora a perfomace na busca
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => this.filter = filter);

  }

  //O componente é destruido quando eu acesso uma outra rota, aí essa componente é destruido
  //Quando meu Component for destruido ele limpará o debounce para liberar memória
  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

}
