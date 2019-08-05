import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NewUser } from './new-user';
import { environment } from './../../../environments/environment'

const API_URL = environment.ApiUrl;//Constante de acordo com o ambiente

//Eu adiciono 'providers' no module home 'HomeModule' pois de lá, qualquer um que precisar usar esse serviço estará disponivel
@Injectable()
export class SignUpService {

    constructor(private http: HttpClient) {}

    //Validar se o usuário existe
    checkUserNameTaken(userName: string) {
        return this.http.get(API_URL + '/user/exists/' + userName);
    }

    //Criar novo registro
    signup(newUser: NewUser){
        return this.http.post(API_URL + '/user/signup', newUser);
    }

}