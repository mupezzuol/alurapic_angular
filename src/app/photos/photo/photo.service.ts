import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Photo } from "./photo";

const API = 'http://localhost:3000';//Constante

@Injectable({ providedIn: 'root' })//Diz que meu Service é INJETAVEL + todos podem acessa-los (provider root)
export class PhotoService{

    //private + paramatro -> O Angular entender que é um atributo da classe, portanto consigo acessa-lo através de outros métodos da classe
    constructor(private http: HttpClient){

    }

    //Método retorna um objeto Observable
    listFromUser(userName: string){
        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos');
    }

}