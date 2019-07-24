import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000';//Constante

//Será uma instancia única para a aplicação inteira
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticate(userName: string, password: string) {

    //Em JSON se minha CHAVE e VALOR forem do mesmo nome, posso emitir e só passar um nome só, nesse casso (userName e password)
    //Na requisição nós recebemos URL + Objeto JavaScropt (JSON)
    return this.http
      .post(API_URL + '/user/login', { userName, password });

  }

}
