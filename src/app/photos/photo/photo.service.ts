import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PhotoComment } from './photo-comment';
import { Photo } from './photo';

const API = 'http://localhost:3000';//Constante

//Diz que meu Service é INJETAVEL + todos podem acessa-los (provider root) porém será uma instancia única para a aplicação inteira
@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    //private + paramatro -> O Angular entender que é um atributo da classe, portanto consigo acessa-lo através de outros métodos da classe
    constructor(private http: HttpClient) {

    }

    listFromUser(userName: string) {
        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos');
    }

    //Método retorna um objeto Observable
    listFromUserPaginated(userName: string, page: number) {
        const params = new HttpParams()
            .append('page', page.toString());

        //Param é o msm nome da const params, por isso emitimos códigos
        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos', { params });
    }

    upload(desc: string, allowComments: boolean, file: File) {
        //Qnd temos dados do tipo FILE, como foto etc... enviamo para o back-end um tipo 'FormData' é diferente de um JSON
        const formData = new FormData();

        //Fazemos um appen seguido de 'mesmo nome do back-end' + 'valor que está sendo enviado'
        formData.append('description', desc);
        formData.append('allowComments', allowComments ? 'true' : 'false');//Retorna String, se for true ou false
        formData.append('imageFile', file);

        return this.http
            .post(API + '/photos/upload', formData);
    }

    findById(photoId: number){
        return this.http.get<Photo>(API + '/photos/' + photoId);
    }

    getComments(photoId: number) {
        return this.http.get<PhotoComment[]>(API + '/photos/' + photoId + '/comments');
    }

}