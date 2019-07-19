import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Component -> É um decorator, nele configuramos 'metadata' que determina como componente irá ser processado, instanciado, usado etc...
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //Array do tipo Object recebendo vazio
  photos: Object[] = [];

  constructor(http: HttpClient){
    http.get<Object[]>('http://localhost:3000/flavio/photos')
      .subscribe(photos => this.photos = photos);
  }



}
