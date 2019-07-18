import { Component } from '@angular/core';

//Component -> É um decorator, nele configuramos 'metadata' que determina como componente irá ser processado, instanciado, usado etc...
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //Array de objetos de Photos
  photos = [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Sultan_the_Barbary_Lion.jpg/440px-Sultan_the_Barbary_Lion.jpg',
      description: 'Leão'
    },
    {
      url: 'http://s2.glbimg.com/2xHkvt4IGBYY6ZnkyrrIzGNATyQ=/s.glbimg.com/jo/g1/f/original/2013/09/17/tigre.jpg',
      description: 'Tigre'
    }
  ];

}
