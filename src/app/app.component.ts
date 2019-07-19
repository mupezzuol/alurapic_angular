import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Component -> É um decorator, nele configuramos 'metadata' que determina como componente irá ser processado, instanciado, usado etc...
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //Array de objetos de Photos
  photos = [];

  constructor(http: HttpClient){
    console.log(http);
  }

}
