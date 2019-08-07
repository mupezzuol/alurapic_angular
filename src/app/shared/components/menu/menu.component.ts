import { Component } from '@angular/core';

@Component({
    selector: 'ap-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent{

    isShow = false;

    // toggle (alternancia) -> Quando eu clico ele muda o boolean, se for false, vira true e vice versa
    toggle(){
        console.log('isShow Atual: ' + this.isShow);
        this.isShow = !this.isShow;//Sempre irá receber o contrário do valor atual
        console.log('isShow Alterado: ' + this.isShow);
    }


}