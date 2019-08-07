import { Component } from '@angular/core';

@Component({
    selector: 'ap-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent{

    isShown = false;

    // toggle (alternancia) -> Quando eu clico ele muda o boolean, se for false, vira true e vice versa
    toggle(){
        console.log('isShow Atual: ' + this.isShown);
        this.isShown = !this.isShown;//Sempre irá receber o contrário do valor atual
        console.log('isShow Alterado: ' + this.isShown);
    }


}