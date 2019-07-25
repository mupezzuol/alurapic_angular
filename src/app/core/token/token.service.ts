import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
    providedIn: 'root'
})
export class TokenService{

    hasToken(){
        // !! ele inverto o resultado do método duas vezes, dessa forma convertemos os valores do retorno do método em um boolean
        // Se getToken() for NULL, ele irá trocar para TRUE e depois para FALSE
        // Se o getToken() for TRUE, ele irá trocar para FALSE e depois para TRUE
        return !!this.getToken();
    }

    setToken(token){
        //Guardo no browser os valores, ao inspecionar elemento, vá até Application -> Local Storage
        window.localStorage.setItem(KEY, token);
    }

    getToken(){
        return window.localStorage.getItem(KEY);
    }

    removeToken(){
        window.localStorage.removeItem(KEY);
    }

}