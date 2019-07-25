import { TokenService } from './../token/token.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as jwt_decode from 'jwt-decode'//Importanto tudo (*) de jwt-decode e dando um alias para ele as (jtw_decode)

import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class UserService{

    private userSubject = new Subject<User>();

    constructor(private tokenService: TokenService){
        //Quando o serviço for chamado ele irá validar se tem token, se tiver token é pq está LOGADO, portanto ele irá DESCODIFICAR o Token e resgatar o User
        this.tokenService.hasToken() &&
            this.decodeAndNotify();
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken();//Resgato o Token
        
        // aqui a chamada 'jwt_decode' que descodifica nosso token, onde nele teremos informações de usuário
        //Como já sabemos as informações que vem do token, nós criamos uma interface de usuário, e na chamada nós já fazemos um CAST de User (as)
        const user = jwt_decode(token) as User;
        this.userSubject.next(user);
    }
    
    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();//Tenho o token em mãos, vou descodifica-lo
    }

    //Retorno u usuário que está em Subject como um Observable (posso utilizar o subscribe)
    getUser() {
        return this.userSubject.asObservable();
    }

}