import { Router, NavigationStart } from '@angular/router';
import { Injectable } from '@angular/core';

import { Alert, AlertType } from './alert';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertService{

    //Subject possui o 'asObservable' ou seja, podemos ficar escutando esse atributo para usarmos o 'subcribe()' nele
    alertSubject: Subject<Alert> = new Subject<Alert>();
    keepAfterRouteChange = false;//Variavel para usarmos para saber se será mantido a mensagem ao trocar as rotas etc...

    constructor(router: Router) {
        //Me inscrevo nos EVENTOS da minha ROTA
        router.events.subscribe(event => {

            //Se o EVENT atual é igual a rota atual/inicio
            if(event instanceof NavigationStart){

                //Se for TRUE deverá atribuir FALSE, para que a mensagem seja mostrada no template
                //Se for FALSE é pq não queremos adicionar a mensagem no template, ou seja, devemos limpar as mensagens da tela
                if(this.keepAfterRouteChange){
                    this.keepAfterRouteChange = false;
                } else {
                    this.clear();
                }
            }
        });

    }

    success(message: string, keepAfterRouteChange: boolean = false){
        this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
    }

    warning(message: string, keepAfterRouteChange: boolean = false){
        this.alert(AlertType.WARNING, message, keepAfterRouteChange);
    }

    danger(message: string, keepAfterRouteChange: boolean = false){
        this.alert(AlertType.DANGER, message, keepAfterRouteChange);
    }

    indo(message: string, keepAfterRouteChange: boolean = false){
        this.alert(AlertType.INFO, message, keepAfterRouteChange);
    }

    private alert(alertType: AlertType, message: string, keepAfterRouteChange: boolean){
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.alertSubject.next(new Alert(alertType, message));
    }

    getAlert(){
        return this.alertSubject.asObservable();//Retornando um OBSERVABLE
    }

    clear(){
        this.alertSubject.next(null);//Adicionp NULL, o Observable será nulo, ou seja, limpara as mensagens etc..
    }

}