import{ Injectable } from '@angular/core';

import { Alert, AlertType } from './alert';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertService{

    //Subject possui o 'asObservable' ou seja, podemos ficar escutando esse atributo para usarmos o 'subcribe()' nele
    alertSubject: Subject<Alert>

    success(message: string){
        this.alert(AlertType.SUCCESS, message);
    }

    warning(message: string){
        this.alert(AlertType.WARNING, message);
    }

    danger(message: string){
        this.alert(AlertType.DANGER, message);
    }

    indo(message: string){
        this.alert(AlertType.INFO, message);
    }

    private alert(alertType: AlertType, message: string){
        this.alertSubject.next(new Alert(alertType, message));
    }

    getAlert(){
        return this.alertSubject.asObservable();//Retornando um OBSERVABLE
    }

}