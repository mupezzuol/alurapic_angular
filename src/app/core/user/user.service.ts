import { TokenService } from './../token/token.service';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode'//Importanto tudo (*) de jwt-decode e dando um alias para ele as (jtw_decode)

import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class UserService{

    // BehaviorSubject -> ele guarda o valor e ficar aguarando até alguém precisar usar, quem for solicitar ele, irá pegar o último valor atribuido para ele
    // O BehaviorSubject armazena a última emissão até que alguém apareça para consumi-la.
    // Obrigatoriamente nós devemos inicializar um valor no construtor dele, por isso adcionamos null
    private userSubject = new BehaviorSubject<User>(null);
    private userName: string;

    constructor(private tokenService: TokenService){
        //Quando o serviço for chamado ele irá validar se tem token, se tiver token é pq está LOGADO, portanto ele irá descriptografar o Token e resgatar o User
        this.tokenService.hasToken() &&
            this.decodeAndNotify();
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken();//Resgato o Token
        
        // aqui a chamada 'jwt_decode' que descriptografa nosso token, onde nele teremos informações de usuário
        //Como já sabemos as informações que do Payload do token que descriptografamos, nós criamos uma interface de usuário, e na chamada nós já fazemos um CAST de User (as)
        const user = jwt_decode(token) as User;
        this.userName = user.name;
        this.userSubject.next(user);
    }
    
    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();//Tenho o token em mãos, vou descriptografa-lo
    }

    //Retorno u usuário que está em Subject como um Observable (posso utilizar o subscribe)
    getUser() {
        return this.userSubject.asObservable();//Converto para Observable
    }

    logout(){
        this.tokenService.removeToken();

        //Next é sempre o último valor do nosso objetos derivados de 'subject' portanto limpamos o valor de usuário, na tela irá aparecer para logar, pois usuário será limpado
        this.userSubject.next(null);
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    getUserName(){
        return this.userName;
    }

}