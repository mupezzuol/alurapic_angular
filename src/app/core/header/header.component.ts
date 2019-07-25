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
    user: User;

    constructor(userService: UserService) {
        this.user$ = userService.getUser();//Retorna um Observable, ou seja, podemos usar o subscribe etc...
        this.user$.subscribe(user => this.user = user);//'user' é a reposta que retornou do Observable, portanto atribuimos esse valor em nossa variavel user
    }
    
}