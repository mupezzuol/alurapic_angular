import { Component } from '@angular/core';

//Component -> É um decorator, nele configuramos 'metadata' que determina como componente irá ser processado, instanciado, usado etc...
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  helloWorld = 'Hellor World';
  nameDev = 'Murillo Pezzuol';
}
