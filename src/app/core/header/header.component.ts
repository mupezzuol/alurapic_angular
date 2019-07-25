import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{

    //user$ -> O '$' no final é um convenção que diz que quando uma variavel irá guardar um Observable nós atribuimos um '$' no final do nome
    user$: Observable<User>;

    // (user$ | async) as user ->>> Estamos usando o ASYNC no template para pegar o usuário
    // o ASYNC faz o subscribe para nós e seta a resposta para nós de acordo com o tipo, e quando não for utilizado ele faz o AUTO-DETROY do objeto 'BehaviorSubject'

    constructor(userService: UserService) {
        this.user$ = userService.getUser();//Retorna um Observable, ou seja, podemos usar o subscribe etc...
    }
    
}