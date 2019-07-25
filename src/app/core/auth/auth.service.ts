import { UserService } from './../user/user.service';
import { TokenService } from './../token/token.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'; //RxJS -> Reactive Extensions for JavaScript. 

const API_URL = 'http://localhost:3000';//Constante

//Será uma instancia única para a aplicação inteira
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  authenticate(userName: string, password: string) {

    //Em JSON se minha CHAVE e VALOR forem do mesmo nome, posso emitir e só passar um nome só, nesse casso (userName e password)
    //Na requisição nós recebemos URL + Objeto JavaScropt (JSON) + Observe (fica observando oq vem na resposta, usamos para pegar Headers etc...)
    //Pipe me permiti colocar filtros, validações, atribuir valores a variavel etc... quem chamar a requisição, antes de executar o subscribe será chamaos os PIPE primeiro
    //TAP -> A operação tap serve para a geração de side effects, normalmente quando queremos logar no console, ou acessar e gravar algum valor
    return this.http
      .post(API_URL + '/user/login', { userName, password }, { observe: 'response'})//URL + Object + Observe (utilizado para expor os valores do Headers etc...)
      .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token');//x-access-token -> é o 'key' que vem em 'headers' da requisição. Nele irá vir nosso token
        this.userService.setToken(authToken);
        console.log(`User ${userName} authenticated with token ${authToken}`)
      }))

  }

}
