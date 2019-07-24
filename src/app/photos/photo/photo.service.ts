import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Photo } from './photo';

const API = 'http://localhost:3000';//Constante

//Diz que meu Service é INJETAVEL + todos podem acessa-los (provider root) porém será uma instancia única para a aplicação inteira
@Injectable({ 
    providedIn: 'root' 
})
export class PhotoService{

    //private + paramatro -> O Angular entender que é um atributo da classe, portanto consigo acessa-lo através de outros métodos da classe
    constructor(private http: HttpClient){

    }

    //Método retorna um objeto Observable
    listFromUserPaginated(userName: string, page: number){
        const params = new HttpParams()
            .append('page', page.toString());

        //Param é o msm nome da const params, por isso emitimos códigos
        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos', { params });
    }

}